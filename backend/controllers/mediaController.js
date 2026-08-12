const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '../uploads');
const IMAGES_DIR = path.join(__dirname, '../../images');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

exports.getMediaFiles = async (req, res, next) => {
  try {
    const files = [];

    if (fs.existsSync(UPLOADS_DIR)) {
      const uploadItems = fs.readdirSync(UPLOADS_DIR);
      uploadItems.forEach(item => {
        const itemPath = path.join(UPLOADS_DIR, item);
        try {
          const stat = fs.statSync(itemPath);
          if (stat.isFile()) {
            files.push({
              name: item,
              url: `uploads/${item}`,
              size: stat.size,
              folder: 'Uploads',
              createdAt: stat.birthtime
            });
          }
        } catch (e) {}
      });
    }

    if (fs.existsSync(IMAGES_DIR)) {
      const imgItems = fs.readdirSync(IMAGES_DIR);
      imgItems.forEach(item => {
        const itemPath = path.join(IMAGES_DIR, item);
        try {
          const stat = fs.statSync(itemPath);
          if (stat.isFile() && /\.(png|jpe?g|svg|webp|gif)$/i.test(item)) {
            files.push({
              name: item,
              url: `images/${item}`,
              size: stat.size,
              folder: 'Website Images',
              createdAt: stat.birthtime
            });
          }
        } catch (e) {}
      });
    }

    res.status(200).json({ success: true, count: files.length, data: files });
  } catch (err) { next(err); }
};

exports.uploadMediaFile = async (req, res, next) => {
  try {
    const { base64Data, filename } = req.body;
    if (!base64Data) {
      return res.status(400).json({ success: false, error: 'Base64 data required' });
    }

    const cleanFilename = (filename || 'upload_' + Date.now() + '.jpg').replace(/[^a-zA-Z0-9_.-]/g, '_');
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(base64Data, 'base64');

    const destPath = path.join(UPLOADS_DIR, cleanFilename);
    fs.writeFileSync(destPath, buffer);

    const fileUrl = `uploads/${cleanFilename}`;

    res.status(201).json({
      success: true,
      url: fileUrl,
      name: cleanFilename
    });
  } catch (err) { next(err); }
};

exports.deleteMediaFile = async (req, res, next) => {
  try {
    const { fileName } = req.body;
    if (!fileName) return res.status(400).json({ success: false, error: 'File name required' });

    const targetPath = path.join(UPLOADS_DIR, path.basename(fileName));
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      return res.status(200).json({ success: true, message: 'File deleted' });
    }

    res.status(404).json({ success: false, error: 'File not found' });
  } catch (err) { next(err); }
};

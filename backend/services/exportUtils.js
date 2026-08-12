// Export Utilities for CSV data formatting

exports.jsonToCsv = (dataArray, headers) => {
  if (!dataArray || !dataArray.length) {
    return headers ? headers.join(',') + '\n' : '';
  }

  const keys = Object.keys(dataArray[0]);
  const headerLine = headers ? headers.join(',') : keys.join(',');

  const rows = dataArray.map(row => {
    return keys.map(k => {
      let val = row[k] === null || row[k] === undefined ? '' : row[k];
      if (typeof val === 'string') {
        val = '"' + val.replace(/"/g, '""') + '"';
      } else if (val instanceof Date) {
        val = '"' + val.toISOString() + '"';
      }
      return val;
    }).join(',');
  });

  return [headerLine, ...rows].join('\n');
};

exports.generateReceiptHTML = (donation) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Donation Receipt - Bal Jyoti Foundation</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #111; max-width: 750px; margin: auto; border: 2px solid #123524; }
    .header { text-align: center; border-bottom: 2px dashed #C6A15B; padding-bottom: 20px; margin-bottom: 20px; }
    .logo-title { font-size: 26px; font-weight: bold; color: #123524; text-transform: uppercase; }
    .sub { font-size: 13px; color: #555; margin-top: 4px; }
    .badge { display: inline-block; background: #123524; color: #C6A15B; font-weight: bold; padding: 6px 16px; border-radius: 20px; font-size: 14px; margin-top: 10px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 25px 0; font-size: 14px; }
    .box { background: #f9fbf9; padding: 12px 18px; border-radius: 8px; border: 1px solid #e0e6e2; }
    .box label { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #666; display: block; margin-bottom: 4px; }
    .box span { font-weight: 600; font-size: 15px; color: #123524; }
    .amount-box { background: #123524; color: #fff; padding: 20px; text-align: center; border-radius: 12px; margin: 25px 0; }
    .amount-val { font-size: 32px; font-weight: bold; color: #C6A15B; }
    .footer { font-size: 12px; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-title">Bal Jyoti Foundation</div>
    <div class="sub">Registered Non-Profit NGO • Bodhgaya, Bihar, India</div>
    <div class="badge">OFFICIAL DONATION RECEIPT</div>
  </div>

  <div class="grid">
    <div class="box"><label>Receipt Number</label><span>${donation.receiptNumber || 'BJF-REC-' + Date.now()}</span></div>
    <div class="box"><label>Date</label><span>${new Date(donation.createdAt || Date.now()).toLocaleDateString()}</span></div>
    <div class="box"><label>Donor Name</label><span>${donation.donorName || 'Generous Donor'}</span></div>
    <div class="box"><label>Email / Phone</label><span>${donation.donorEmail || donation.donorPhone || 'N/A'}</span></div>
    <div class="box"><label>PAN Number</label><span>${donation.panNumber || 'N/A'}</span></div>
    <div class="box"><label>Payment Mode</label><span>${(donation.paymentMethod || 'Online Transfer').toUpperCase()}</span></div>
  </div>

  <div class="amount-box">
    <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Amount Received</div>
    <div class="amount-val">₹${(donation.amount || 0).toLocaleString('en-IN')} INR</div>
    <div style="font-size: 12px; margin-top: 6px; opacity: 0.85;">Eligible for Tax Exemption under Section 80G of Income Tax Act</div>
  </div>

  <div class="footer">
    <p>Thank you for empowering rural artisans, women, and children across Bihar and Jharkhand.</p>
    <p>Bal Jyoti Foundation • Email: info@baljyotifoundation.org • Web: www.baljyotifoundation.org</p>
  </div>
</body>
</html>
  `;
};

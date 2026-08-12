/* ==========================================================================
   BAL JYOTI FOUNDATION - INTERVENTIONS DATASTORE
   Centralized data repository for Rugs, Bamboo Craft, Basketry, and Stitching.
   ========================================================================== */

const INTERVENTIONS_DATA = {
  // 1. RUGS
  "rugs": {
    id: "rugs",
    slug: "rugs.html",
    title: "Handmade Rugs & Dhurrie Weaving",
    shortDesc: "Preserving traditional handwoven rug craftsmanship while creating sustainable livelihoods for rural artisans across Bihar & Jharkhand.",
    coverImage: "images/rug1.jpg",
    heroImage: "images/hero_luxury_rug_stack.jpg",
    category: "Heritage Craft",

    // Section 2: About the Program
    about: {
      tagline: "HERITAGE CRAFT PRESERVATION",
      heading: "Reviving Traditional Handloom Weaving for Rural Artisans",
      whatItIs: "The Handmade Rugs & Dhurrie Weaving program revives centuries-old flat-weave and hand-knotted carpet traditions in rural Bihar and Jharkhand. Artisans create heirloom-quality home textiles using 100% natural, unbleached fibers.",
      whyStarted: "Cheap synthetic imports and middleman exploitation drove traditional weaving families into extreme poverty. Bal Jyoti Foundation established community loom centers to provide fair wages, modern ergonomic looms, and direct market access.",
      objectives: [
        "Train rural women and youth in master hand-knotting & flat-weave dhurrie techniques.",
        "Provide zero-cost ergonomic vertical looms and high-grade organic wool and cotton yarn.",
        "Eliminate middleman exploitation by connecting artisans directly with global ethical markets.",
        "Implement 100% GOTS-certified natural vegetable dyeing processes."
      ],
      communityImportance: "This program creates reliable, year-round household income, empowers women with financial autonomy, and prevents forced rural-to-urban distress migration."
    },

    // Section 3: Complete Working Process (Vertical Timeline)
    process: [
      { step: 1, title: "Raw Material Collection", desc: "Sourcing premium organic cotton and high-grade Indian wool directly from ethical local sheep farmers.", icon: "fa-seedling", image: "images/rug1.jpg" },
      { step: 2, title: "Cleaning & Washing", desc: "Washing raw fibers with eco-friendly natural enzymes to remove dirt and oils without harsh chemicals.", icon: "fa-soap", image: "images/rug2.jpg" },
      { step: 3, title: "Yarn Preparation", desc: "Drawing and spinning scoured fibers into strong, uniform yarn using traditional wooden charkhas.", icon: "fa-compact-disc", image: "images/g1.jpg" },
      { step: 4, title: "Natural Dyeing", desc: "Dyeing yarn bundles in small batches using natural madder root, indigo, turmeric, and marigold flowers.", icon: "fa-palette", image: "images/g2.jpg" },
      { step: 5, title: "Design Planning", desc: "Mapping contemporary geometric motifs onto graph sheets (Talim) and warping the vertical wooden loom.", icon: "fa-border-all", image: "images/g3.jpg" },
      { step: 6, title: "Hand Weaving", desc: "Artisans meticulously weave row-by-row, knotting individual threads according to intricate graph patterns.", icon: "fa-hands-reversing", image: "images/rug1.jpg" },
      { step: 7, title: "Trimming & Finishing", desc: "Washing finished rugs with natural soap nuts and hand-shearing pile height to uniform precision.", icon: "fa-scissors", image: "images/rug2.jpg" },
      { step: 8, title: "Quality Checking", desc: "Rigorous 12-point quality inspection verifying knot density, border alignment, and dimensional accuracy.", icon: "fa-clipboard-check", image: "images/g4.jpg" },
      { step: 9, title: "Packaging", desc: "Wrapping rugs in eco-friendly jute covers with artisan signature tags detailing the weaver's story.", icon: "fa-box-open", image: "images/g5.jpg" }
    ],

    // Section 4: Materials & Tools Used
    materials: [
      { name: "Organic Desi Wool", desc: "Pure unbleached Indian wool providing softness, warmth, and lifelong durability.", purpose: "Primary yarn material for carpet pile", icon: "fa-cloud" },
      { name: "Organic Cotton Warp", desc: "High-tensile 100% natural cotton threads for strong loom foundation.", purpose: "Structural vertical loom warp", icon: "fa-scroll" },
      { name: "Botanical Dyes", desc: "Extracts from madder root, indigo leaves, marigold petals, and pomegranate rinds.", purpose: "100% non-toxic natural coloring", icon: "fa-flask" },
      { name: "Ergonomic Vertical Looms", desc: "Heavy-duty wooden frames engineered to reduce posture strain during weaving.", purpose: "Artisan weaving apparatus", icon: "fa-border-all" },
      { name: "Iron Panja (Weaving Comb)", desc: "Hand-forged heavy iron combs used to beat wet weft threads tightly into alignment.", purpose: "Weft compacting tool", icon: "fa-utensils" },
      { name: "Curved Shearing Scissors", desc: "Precision angled blades for hand-trimming rug pile heights evenly.", purpose: "Pile trimming & surface finishing", icon: "fa-scissors" }
    ],

    // Section 5: Skills & Techniques
    skills: [
      { name: "Weaving Techniques", desc: "Mastering Senneh hand-knotted pile and flat-weave dhurrie techniques on vertical looms.", icon: "fa-border-all" },
      { name: "Colour Matching", desc: "Extracting precise shade gradients using GOTS-certified plant-based dye baths.", icon: "fa-palette" },
      { name: "Knotting Precision", desc: "Tying 100 to 150 individual Turkish and Persian knots per square inch accurately.", icon: "fa-hands-reversing" },
      { name: "Finishing Excellence", desc: "Hand-shearing pile height and binding selvedge edges with high-tensile cotton.", icon: "fa-scissors" },
      { name: "Quality Control", desc: "Inspecting weave tension, pattern alignment, and color fastness before export.", icon: "fa-clipboard-check" },
      { name: "Product Care", desc: "Guiding clients on vacuuming, natural spot cleaning, and preserving rug longevity.", icon: "fa-shield-halved" }
    ],

    // Section 6: Product Gallery
    gallery: [
      { src: "images/hero_luxury_rug_stack.jpg", caption: "Stack of finished hand-knotted organic wool rugs" },
      { src: "images/rugs_hanging_nature.jpg", caption: "Artisan rugs drying under natural sunlight in Bodhgaya" },
      { src: "images/rug1.jpg", caption: "Master weaver working on intricate geometric dhurrie loom" },
      { src: "images/rug2.jpg", caption: "Close-up detail of natural dyed organic wool yarn" },
      { src: "images/paper_loom_weaving.jpg", caption: "New artisan trainee practicing pattern graph layout" },
      { src: "images/smiling_artisan_loom.jpg", caption: "Artisan displaying completed fair-trade carpet order" }
    ],

    // Section 7: FAQ
    faqs: [
      { q: "What materials are used in Bal Jyoti rugs?", a: "We use 100% organic Indian desi wool, unbleached cotton warp, and 100% plant-based botanical dyes free from synthetic chemicals." },
      { q: "How long does it take to weave a rug?", a: "Depending on size and knot density, a flat-weave dhurrie takes 10 to 15 days, while a detailed hand-knotted rug takes 30 to 60 days of skilled work." },
      { q: "How are artisan wages determined?", a: "Artisans receive fair-trade piece-rate wages calculated at 2.5x above local minimum wage standards, along with health stipends." },
      { q: "How should I clean and care for a handwoven rug?", a: "Vacuum regularly without a beater bar. For spills, spot clean immediately with mild soap and cold water. Avoid harsh bleach or dry cleaning." }
    ]
  },

  // 2. BAMBOO CRAFT
  "bamboo": {
    id: "bamboo",
    slug: "bamboo.html",
    title: "Artisanal Bamboo Craft",
    shortDesc: "Transforming locally harvested bamboo into eco-friendly furniture, lampshades, and sustainable home decor replacing single-use plastic.",
    coverImage: "images/bamboo_artisan_hero.png",
    heroImage: "images/bamboo_artisan_hero.png",
    category: "Sustainable Craft",

    about: {
      tagline: "GREEN INNOVATION",
      heading: "Sustainable Bamboo Crafts Transforming Village Forests",
      whatItIs: "The Artisanal Bamboo Craft program trains rural and tribal artisans to process rapidly growing local bamboo into modern furniture, lampshades, kitchenware, and lifestyle decor.",
      whyStarted: "Depleting timber resources and lack of processing tools forced bamboo artisans into low-value basket making. Bal Jyoti Foundation introduced eco-treatment vats, precision splitters, and contemporary design training.",
      objectives: [
        "Train 300+ rural youth annually in scientific bamboo seasoning and joinery.",
        "Establish community-owned chemical-free borax treatment centers.",
        "Manufacture zero-plastic home decor, lighting, and utility items.",
        "Reforest degraded lands with native bamboo saplings."
      ],
      communityImportance: "Bamboo harvesting and crafting provides eco-friendly economic development, protects local forests, and yields high profit margins for artisan families."
    },

    process: [
      { step: 1, title: "Selective Bamboo Harvesting", desc: "Selecting mature 3-4 year old bamboo culms at dawn to preserve fiber strength and natural sugar balance.", icon: "fa-tree", image: "images/bamboo1.jpg" },
      { step: 2, title: "Borax Salt Seasoning", desc: "Soaking bamboo culms in natural borax-boric acid salt solution to prevent termite and borer attack.", icon: "fa-vial", image: "images/bamboo2.529bd1573bf9c90a1a9c.png" },
      { step: 3, title: "Precision Radial Splitting", desc: "Using mechanical radial die splitters to split round poles into uniform longitudinal strips.", icon: "fa-arrows-split-up-and-left", image: "images/bamboo3.89531774965a04508850.png" },
      { step: 4, title: "Thermal Heat Bending", desc: "Using blowtorches and steam boxes to bend thick bamboo poles into smooth curved furniture frames.", icon: "fa-fire", image: "images/hero_bamboo_craft.jpg" },
      { step: 5, title: "Joinery & Weaving Assembly", desc: "Artisans weave fine slivers around bent structural frames using hidden wooden pin joinery.", icon: "fa-cubes", image: "images/bamboo_artisan_hero.png" },
      { step: 6, title: "Sanding & Polish Finishing", desc: "Hand-sanding surface nodes and applying natural cashew shell oil or clear beeswax polish.", icon: "fa-paint-roller", image: "images/bamboo4.e59e4bc27f3c38d60b20.png" },
      { step: 7, title: "Quality Inspection", desc: "Checking structural weight tolerance, joint rigidity, and smooth surface finish.", icon: "fa-clipboard-check", image: "images/bamboo_artisan_hero.png" },
      { step: 8, title: "Eco Packaging", desc: "Boxing finished items with recycled paper wrap and bamboo authenticity cards.", icon: "fa-box-open", image: "images/bamboo4.e59e4bc27f3c38d60b20.png" }
    ],

    materials: [
      { name: "Tulda & Balcooa Bamboo", desc: "Native thick-walled bamboo species ideal for furniture and structural joinery.", purpose: "Main structural timber material", icon: "fa-tree" },
      { name: "Borax & Boric Acid Salts", desc: "Natural mineral salt treatment rendering bamboo 100% insect-resistant.", purpose: "Non-toxic eco preservation", icon: "fa-vial" },
      { name: "Radial Steel Splitter", desc: "Multi-blade die used to split bamboo poles into equal uniform slivers.", purpose: "Precision bamboo splitting", icon: "fa-circle-notch" },
      { name: "Fine Sliver Knives", desc: "Razor-sharp hand tools for shaving paper-thin bamboo weaving strips.", purpose: "Weaving strip preparation", icon: "fa-scissors" },
      { name: "Cashew Shell Oil", desc: "Water-resistant organic finish enhancing natural golden luster.", purpose: "Eco surface polish", icon: "fa-bottle-droplet" }
    ],

    skills: [
      { name: "Bamboo Curing", desc: "Immersion treatment in natural mineral salts for insect resistance.", icon: "fa-vial" },
      { name: "Precision Slivering", desc: "Shaving thin, uniform bamboo strips for intricate weaving.", icon: "fa-scissors" },
      { name: "Thermo Heat Bending", desc: "Softening bamboo lignin with heat to bend smooth curves.", icon: "fa-fire" },
      { name: "Mortise Joinery", desc: "Assembling structural frames using hidden bamboo pins.", icon: "fa-cubes" },
      { name: "Quality Control", desc: "Testing weight capacity and smooth node sanding.", icon: "fa-clipboard-check" },
      { name: "Product Care", desc: "Maintaining bamboo furniture with natural oil wipes.", icon: "fa-shield-halved" }
    ],

    gallery: [
      { src: "images/bamboo_artisan_hero.png", caption: "Master artisan crafting woven bamboo lampshades" },
      { src: "images/hero_bamboo_craft.jpg", caption: "Artisanal woven bamboo pendant light fixtures" },
      { src: "images/bamboo1.jpg", caption: "Stack of cured eco bamboo poles ready for splitting" },
      { src: "images/bamboo2.529bd1573bf9c90a1a9c.png", caption: "Artisan inspecting paper-thin bamboo weaving strips" },
      { src: "images/bamboo3.89531774965a04508850.png", caption: "Handwoven bamboo storage baskets with natural polish" },
      { src: "images/bamboo4.e59e4bc27f3c38d60b20.png", caption: "Display of finished bamboo desk accessories" }
    ],

    faqs: [
      { q: "Is bamboo furniture durable and termite resistant?", a: "Yes. All bamboo culms undergo a 5-day borax mineral bath that neutralizes natural starches, making it 100% resistant to termites and borers." },
      { q: "Can bamboo products replace single-use plastic?", a: "Absolutely. Our bamboo pens, organizers, utility baskets, and cutlery sets are 100% biodegradable and zero-plastic." },
      { q: "How do I care for bamboo home decor?", a: "Keep indoors or under covered patios. Wipe with a dry or slightly damp soft cloth and apply cashew oil or beeswax once a year." }
    ]
  },

  // 3. BASKETRY
  "basketry": {
    id: "basketry",
    slug: "basketry.html",
    title: "Handcrafted Basketry & Moonj Weaving",
    shortDesc: "Supporting rural women in creating handcrafted Moonj grass baskets, hampers, and natural fiber home decor accessories.",
    coverImage: "images/basketry_artisan_hero.png",
    heroImage: "images/basketry_artisan_hero.png",
    category: "Natural Fiber Art",

    about: {
      tagline: "NATURAL FIBER CRAFT",
      heading: "Elevating Wild River Grass Weaving into Sustainable Home Decor",
      whatItIs: "The Handcrafted Basketry program trains rural women to harvest and coil wild Moonj and Kauna grass into eco-friendly storage baskets, laundry hampers, placemats, and art pieces.",
      whyStarted: "Wild riverbank grasses grew abundantly but were used only for crude rope making. Bal Jyoti Foundation introduced refined coiling techniques, organic plant dyeing, and genuine leather handle accents.",
      objectives: [
        "Train 400+ rural women annually in coiled and plaited grass basketry.",
        "Provide natural dye workshops using madder, turmeric, and marigold.",
        "Supply steel bodkin needles, wooden molds, and quality handles.",
        "Connect artisan cooperatives with top interior retailers worldwide."
      ],
      communityImportance: "Allows rural women to earn flexible, dignified income right from their home verandas while looking after their families."
    },

    process: [
      { step: 1, title: "Wild Grass Harvesting", desc: "Collecting wild Moonj and Kans grass stalks along riverbanks after the monsoon season.", icon: "fa-wheat-awn", image: "images/hero_moonj_grass.jpg" },
      { step: 2, title: "Peeling & Sun Drying", desc: "Splitting outer husks and drying inner golden fibers on rooftop mats for 3 days.", icon: "fa-sun", image: "images/basketry1.d405077adc18cced0f3b.png" },
      { step: 3, title: "Organic Botanical Dyeing", desc: "Boiling dried grass bundles with organic marigold, indigo, and pomegranate dyes.", icon: "fa-palette", image: "images/basketry2.4d045febc6f48ac6e1f9.png" },
      { step: 4, title: "Fiber Conditioning", desc: "Dampening grass stalks in clean water to render them pliable for tight coiling.", icon: "fa-droplet", image: "images/basket_weaving_artisan.jpg" },
      { step: 5, title: "Coiled Stitching Weave", desc: "Binding core grass strands tightly using a steel bodkin needle to build basket walls.", icon: "fa-basket-shopping", image: "images/basketry_artisan_hero.png" },
      { step: 6, title: "Finishing & Handle Attachment", desc: "Trimming loose ends and stitching genuine leather or braided grass handles.", icon: "fa-scissors", image: "images/basketry3.2a898e5b54e81f76b9f2.png" },
      { step: 7, title: "Quality Checking", desc: "Verifying basket rim symmetry, weave tightness, and color uniformity.", icon: "fa-clipboard-check", image: "images/basketry4.4306cac96f275fc05740.png" }
    ],

    materials: [
      { name: "Wild Riverbank Moonj Grass", desc: "Tough, water-resistant wild grass harvested along riverbeds.", purpose: "Core fiber structural material", icon: "fa-wheat-awn" },
      { name: "Soft Kauna Reeds", desc: "Flexible wetland reeds used as core filler for soft structure baskets.", purpose: "Basket core filler", icon: "fa-seedling" },
      { name: "Steel Bodkin Needles", desc: "Tapered hand needles used to pierce core bundles and pull binding fibers tight.", purpose: "Coiling & stitching tool", icon: "fa-pen-nib" },
      { name: "Botanical Dyes", desc: "Natural extracts from indigo, madder, turmeric, and acacia bark.", purpose: "Organic color dye baths", icon: "fa-flask" },
      { name: "Eco Leather Handles", desc: "Vegetable tanned leather straps stitched to laundry hampers.", purpose: "Luxury handle accents", icon: "fa-shield-halved" }
    ],

    skills: [
      { name: "Wild Fiber Sorting", desc: "Harvesting, peeling, and grading grass stalks by length and fiber strength.", icon: "fa-wheat-awn" },
      { name: "Botanical Dyeing", desc: "Coloring natural grass bundles with plant-based dye baths.", icon: "fa-palette" },
      { name: "Coiled Stitching", desc: "Binding core bundles in tight uniform spirals using bodkins.", icon: "fa-basket-shopping" },
      { name: "Pattern Inlaying", desc: "Weaving geometric color motifs into basket walls.", icon: "fa-shapes" },
      { name: "Quality Control", desc: "Checking rim symmetry, base stability, and handle stitching.", icon: "fa-clipboard-check" },
      { name: "Product Care", desc: "Guiding clients on dusting and keeping natural grass dry.", icon: "fa-shield-halved" }
    ],

    gallery: [
      { src: "images/basketry_artisan_hero.png", caption: "Rural women weaving Moonj grass baskets together in courtyard" },
      { src: "images/basket_weaving_artisan.jpg", caption: "Close-up of artisan using steel bodkin needle for coiled weaving" },
      { src: "images/basketry1.d405077adc18cced0f3b.png", caption: "Collection of multi-colored natural dyed storage baskets" },
      { src: "images/basketry2.4d045febc6f48ac6e1f9.png", caption: "Sun-drying raw Moonj grass stalks on village rooftops" },
      { src: "images/basketry3.2a898e5b54e81f76b9f2.png", caption: "Luxury planter baskets with leather handles" },
      { src: "images/basketry4.4306cac96f275fc05740.png", caption: "Woven grass placemats and coaster dining set" }
    ],

    faqs: [
      { q: "How long do Moonj grass baskets last?", a: "Moonj grass is naturally tough and moisture-resistant. With basic indoor care, baskets easily last 10 to 15 years." },
      { q: "Are the dyes safe for storing fruit or food?", a: "Yes! All dyes are 100% botanical plant extracts (turmeric, marigold, madder) and completely food-safe." },
      { q: "How do I clean grass baskets?", a: "Dust with a soft brush or dry cloth. For light spots, wipe gently with a slightly damp cloth and allow to air dry completely." }
    ]
  },

  // 4. STITCHING
  "stitching": {
    id: "stitching",
    slug: "stitching.html",
    title: "Tailoring & Textile Stitching",
    shortDesc: "Empowering women through tailoring, industrial stitching, pattern drafting, and eco garment production for financial independence.",
    coverImage: "images/stitching1.jpg",
    heroImage: "images/stitching1.jpg",
    category: "Vocational Skills",

    about: {
      tagline: "VOCATIONAL SKILLS",
      heading: "Garment Manufacturing & Tailoring for Rural Women",
      whatItIs: "The Tailoring & Textile Stitching program equips rural women with industrial machine sewing, pattern cutting, and garment assembly skills to produce eco canvas bags, school uniforms, and garments.",
      whyStarted: "Lack of formal vocational training confined young rural women to unpaid agricultural labor. Bal Jyoti Foundation established modern tailoring centers equipped with motor-driven machines and commercial bulk production contracts.",
      objectives: [
        "Graduate 500+ certified women tailors annually from our 6-month diploma program.",
        "Provide subsidized motor-driven industrial sewing machines to graduates.",
        "Secure commercial bulk orders for eco cotton canvas bags and school uniforms.",
        "Teach pattern drafting, garment fitting, and micro-boutique management."
      ],
      communityImportance: "Empowers women with independent income, self-confidence, and the ability to start village boutiques or work in garment centers."
    },

    process: [
      { step: 1, title: "Fabric Inspection & Spreading", desc: "Checking organic cotton canvas and linen rolls for flaws and laying them flat on cutting tables.", icon: "fa-scroll", image: "images/stitching1.jpg" },
      { step: 2, title: "Pattern Marking & Drafting", desc: "Tracing master paper pattern templates onto fabric using tailor's chalk for zero fabric waste.", icon: "fa-ruler-combined", image: "images/stitching2.6d9caefff1de60a574f1.png" },
      { step: 3, title: "Precision Fabric Cutting", desc: "Using electric rotary fabric cutters to cut multiple fabric layers cleanly.", icon: "fa-scissors", image: "images/stitching3.fd23bea98a713e769fb5.png" },
      { step: 4, title: "Industrial Machine Assembly", desc: "Seaming pockets, collars, zippers, and main body panels on motor-driven lockstitch machines.", icon: "fa-gears", image: "images/stitching1.jpg" },
      { step: 5, title: "Serger Edge Overlocking", desc: "Overlocking inner seams with 5-thread sergers to prevent fraying and ensure seam durability.", icon: "fa-border-none", image: "images/stitching2.6d9caefff1de60a574f1.png" },
      { step: 6, title: "Steam Pressing & QC", desc: "Vacuum steam pressing finished garments, inspecting stitching tension, and attaching hangtags.", icon: "fa-tag", image: "images/stitching3.fd23bea98a713e769fb5.png" },
      { step: 7, title: "Eco Packaging", desc: "Bundling garments into recycled paper wrapping for distribution.", icon: "fa-box-open", image: "images/hero_artisan_women.jpg" }
    ],

    materials: [
      { name: "Juki Industrial Lockstitch", desc: "High-speed single needle motor machines for smooth, precise stitching.", purpose: "Primary garment assembly", icon: "fa-gears" },
      { name: "5-Thread Serger Overlockers", desc: "Professional edge-finishing machinery preventing seam fraying.", purpose: "Edge overlocking", icon: "fa-border-none" },
      { name: "Rotary Fabric Cutters", desc: "Electric circular blades for cutting up to 50 fabric layers simultaneously.", purpose: "Bulk fabric cutting", icon: "fa-scissors" },
      { name: "Vacuum Steam Stations", desc: "Industrial steam tables for crisp garment pressing and crease setting.", purpose: "Garment pressing", icon: "fa-temperature-high" },
      { name: "Organic Cotton Canvas", desc: "GOTS-certified sustainable woven fabric for heavy-duty bags.", purpose: "Eco bag manufacturing", icon: "fa-scroll" }
    ],

    skills: [
      { name: "Machine Operation", desc: "Mastering high-speed industrial lockstitch and overlock sewing machines.", icon: "fa-gears" },
      { name: "Pattern Drafting", desc: "Measuring, marking, and cutting paper pattern templates.", icon: "fa-ruler-combined" },
      { name: "Component Assembly", desc: "Stitching zippers, buttonholes, pockets, and collars seamlessly.", icon: "fa-scissors" },
      { name: "Edge Finishing", desc: "Overlocking inner seams to ensure long-lasting garment durability.", icon: "fa-border-none" },
      { name: "Quality Control", desc: "Inspecting stitch tension, seam strength, and size measurements.", icon: "fa-clipboard-check" },
      { name: "Product Care", desc: "Washing and pressing advice for cotton canvas bags and garments.", icon: "fa-shield-halved" }
    ],

    gallery: [
      { src: "images/stitching1.jpg", caption: "Women trainees operating industrial sewing machines at Bodhgaya Center" },
      { src: "images/stitching2.6d9caefff1de60a574f1.png", caption: "Instructor demonstrating pattern drafting on paper templates" },
      { src: "images/stitching3.fd23bea98a713e769fb5.png", caption: "Fabric cutting and assembly of eco-friendly cotton tote bags" },
      { src: "images/hero_artisan_women.jpg", caption: "Graduation ceremony presenting sewing machines to top students" }
    ],

    faqs: [
      { q: "Is prior sewing experience required?", a: "No prior experience is required. Our 6-month diploma starts from basic hand stitching up to industrial machine operation." },
      { q: "Do graduates receive assistance starting a business?", a: "Yes. Top graduates receive subsidized sewing machines and micro-loans to start their own local village boutiques." },
      { q: "What products do trainees manufacture?", a: "Trainees produce eco-friendly canvas tote bags, school uniforms, aprons, cushion covers, and custom tailored apparel." }
    ]
  }
};

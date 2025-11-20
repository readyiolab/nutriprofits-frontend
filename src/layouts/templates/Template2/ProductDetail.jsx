import {
  ArrowLeft,
  Star,
  Check,
  Shield,
  Zap,
  Heart,
  Share2,
  ShoppingBag,
  Dot,
} from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetailTemplate2 = () => {
  const { productId, templateId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("highlights");
  const [quantity, setQuantity] = useState(1);

  const onBack = () => {
    navigate(`/template/${templateId}/products`);
  };

  const products = [
    {
      id: 1,
      name: "Matcha Extreme",
      price: "$59.99",
      category: "Weight Loss",
      description:
        "Premium matcha blend for energy boost and weight management",
      fullDescription:
        "Matcha Extreme is a premium supplement designed to help you lose weight in a tasty and healthy way. It combines the power of matcha green tea with other natural ingredients to boost metabolism, increase energy, and support healthy weight management.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792729/Matcha_Extreme_ty0jgp.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405628/Matcha_Extreme_arxbnc.png",
      rating: 4.8,
      highlights: [
        "Helps achieve and maintain a healthy body weight",
        "Increases the excretion of water from the body",
        "Reduces feelings of fatigue and tiredness",
        "Helps maintain normal blood glucose levels",
      ],
      benefits: [
        "Loss of excess weight",
        "Improved metabolism and digestion",
        "Increased water excretion from the body",
        "Stable glycaemia and reduced appetite",
        "Increased energy to take action",
        "More energy and motivation to exercise",
        "Improved concentration and support of the nervous system",
        "Decreased feelings of fatigue and tiredness",
        "Revitalisation of the body and mind",
        "Efficient elimination of toxins and heavy metals",
        "Improved lipid profile",
        "Reduction of stress and tension",
        "Protection against free radicals",
      ],
      ingredients: [
        {
          name: "Matcha Green Tea Leaves Powder",
          description:
            "Rich in antioxidants, chlorophyll, EGCG, l-theanine and catechins. Supports weight loss, blood sugar stability, lipid profile, liver and heart health.",
        },
        {
          name: "Cacti-Nea™ (Prickly Pear Fruit Extract)",
          description:
            "Rich source of indicaxanthin, inhibits water retention, reduces waist circumference, slims figure, enhances muscle definition.",
        },
        {
          name: "Spirulina Powder",
          description:
            "High in protein, antioxidants, vitamins and trace elements. Speeds up metabolism, regulates blood sugar, detoxifies body, lowers cholesterol.",
        },
        {
          name: "Acerola Fruit Extract",
          description:
            "Natural vitamin C source, improves immune system function, supports post-workout regeneration, reduces fatigue.",
        },
      ],
    },
    {
      id: 2,
      name: "Night Mega Burner",
      price: "$49.99",
      category: "Weight Loss",
      description: "Nighttime fat burning formula",
      fullDescription:
        "Night Mega Burner is a revolutionary nighttime fat burning formula that works while you sleep. It supports weight loss, improves sleep quality, and helps you wake up refreshed and energized.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792731/Night_Mega_Burner_wj9b5r.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405653/Night_Mega_Burner_tulizs.png",
      rating: 4.7,
      highlights: [
        "Supports the achievement of normal body weight",
        "Stimulates protein and glycogen metabolism",
        "Supports the achievement of a relaxed state",
        "Facilitates falling asleep and improves sleep quality",
      ],
      benefits: [
        "Supports reduction of excessive pounds",
        "Stimulates metabolism",
        "Facilitates falling asleep",
        "Improves sleep quality",
        "Supports relaxation and stress reduction",
      ],
      ingredients: [
        {
          name: "Grains of Paradise Seed Extract [12.5% 6-Paradol]",
          description:
            "Increases energy expenditure, stimulates fat reduction, improves lipid profile, shows thermogenic effects, enhances glucose utilization, inhibits lipid synthesis in adipocytes.",
        },
        {
          name: "Garcinia Cambogia Fruit Extract [60% HCA]",
          description:
            "Reduces appetite, limits fat synthesis, supports carbohydrate metabolism, improves energy levels and endurance, maintains normal blood sugar levels.",
        },
        {
          name: "Green Tea Leaf Extract [40% EGCG]",
          description:
            "Supports fat reduction, improves lipid profile, regulates blood sugar levels, prolongs norepinephrine activity, stimulates thermogenesis.",
        },
        {
          name: "Saffr'Activ®",
          description:
            "Improves sleep quality, facilitates falling asleep, reduces feelings of anxiety.",
        },
        {
          name: "L-Theanine from Green Tea",
          description:
            "Supports brain and nervous system function, enhances concentration, creativity, memory, and has antidepressant properties.",
        },
        {
          name: "Lemon Balm Herb Extract",
          description:
            "Facilitates relaxation, maintains positive mood, aids falling asleep.",
        },
        {
          name: "BioPerine®",
          description:
            "Supports thermogenesis, weight loss, and improves nutrient absorption.",
        },
        {
          name: "Vitamin B6",
          description:
            "Supports nervous system, maintains energy metabolism, crucial for body functions.",
        },
        {
          name: "Aquamin™ Mg",
          description:
            "Reduces fatigue, supports normal psychological function, maintains electrolyte balance.",
        },
        {
          name: "N-Acetyl-L-tyrosine",
          description:
            "Supports nervous system, participates in hormone synthesis, enhances brain function.",
        },
      ],
    },
    {
      id: 3,
      name: "Meltamin",
      price: "$54.99",
      category: "Weight Loss",
      description: "Natural weight management",
      fullDescription:
        "Meltamin is a natural weight management supplement that helps shed excess pounds, supports body sculpting, and improves stamina. Say goodbye to unwanted body fat with this comprehensive formula.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792729/Meltamin_gtv1ms.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405629/Meltamin_yqou1g.png",
      rating: 4.6,
      highlights: [
        "Supports fat metabolism and weight control",
        "Supports the removal of excess water from the body",
        "Reduces the sensation of exertion during exercise",
        "Helps maintain proper glucose levels in the blood",
      ],
      benefits: [
        "Helps shed excess pounds",
        "Supports body sculpting and muscle definition",
        "Improves stamina and performance",
        "Enhances self-confidence and appearance",
      ],
      ingredients: [
        {
          name: "Cacti-Nea™ (Prickly Pear Fruit Extract)",
          description:
            "Rich in indicaxanthin, reduces water retention, supports weight loss, enhances muscle definition, clinically shown to reduce waist, calves, and ankle circumference.",
        },
        {
          name: "Citrin K (Garcinia Cambogia Fruit Extract [50% HCA])",
          description:
            "Inhibits fat formation, reduces appetite, helps maintain normal blood sugar and fat levels, supports weight management.",
        },
        {
          name: "Guarana Seed Extract [22% Caffeine]",
          description:
            "Exhibits thermogenic effects, accelerates fat metabolism, suppresses appetite.",
        },
        {
          name: "Bitter Orange Fruit Extract [6% Synephrine]",
          description:
            "Supports lipid breakdown, stimulates carbohydrate and fat metabolism, enhances body efficiency.",
        },
        {
          name: "Green Tea Leaf Extract [40% EGCG]",
          description:
            "Strong antioxidant, supports lipid profile, regulates blood sugar, promotes fat metabolism.",
        },
        {
          name: "Caffeine Anhydrous",
          description:
            "Increases physical performance, reduces fatigue, improves concentration.",
        },
        {
          name: "Raspberry Fruit Extract [50% Raspberry Ketones]",
          description:
            "Improves metabolism, prevents weight gain, helps control body weight.",
        },
        {
          name: "BioPerine®",
          description:
            "Increases thermogenesis, promotes lipid breakdown, improves absorption of supplement ingredients.",
        },
        {
          name: "Vitamin B6",
          description:
            "Reduces fatigue, improves concentration, supports proper body function.",
        },
        {
          name: "Pantothenic Acid",
          description:
            "Reduces fatigue, participates in antibody production, promotes proper body function.",
        },
        {
          name: "Chromium",
          description:
            "Helps maintain normal blood sugar, reduces appetite and snacking cravings.",
        },
      ],
    },
    {
      id: 4,
      name: "Fat Burn Active",
      price: "$64.99",
      category: "Weight Loss",
      description: "High-performance fat burner",
      fullDescription:
        "Fat Burn Active is a high-performance fat burner designed to say goodbye to unwanted body fat. It supports fat tissue reduction, boosts metabolism, enhances physical performance, and reduces fatigue.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792730/Fat_Burn_Active_fx9q50.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405623/Fat_Burn_Active_g99brb.png",
      rating: 4.9,
      highlights: [
        "Supports fat tissue reduction",
        "Improves body weight control",
        "Boosts metabolism",
        "Enhances physical performance",
        "Reduces fatigue",
      ],
      benefits: [
        "Stimulates lipolysis and thermogenesis",
        "Increases metabolism and energy expenditure",
        "Supports body efficiency and exercise performance",
        "Facilitates lean body mass building",
        "Safe, premium ingredients without harmful additives",
      ],
      ingredients: [
        {
          name: "Coleus Forskohlii Root Extract [10% Forskolin]",
          description:
            "Stimulates lipase, accelerates metabolism, supports fat reduction, increases lean body mass",
        },
        {
          name: "aXivite® - Microencapsulated Phenylcapsaicin [1% Phenylcapsaicin]",
          description:
            "Enhances fat burning, improves body proportions, supports digestive health",
        },
        {
          name: "Bitter Orange Extract [6% Synephrine]",
          description:
            "Natural fat burner, stimulates thermogenesis, improves performance, regulates appetite",
        },
        {
          name: "Grains of Paradise Seed Extract [12.5% 6-Paradol]",
          description:
            "Thermogenic, stimulates fat burning, improves glucose metabolism",
        },
        {
          name: "Green Tea Leaf Extract [40% EGCG]",
          description:
            "Reduces fat absorption, supports weight loss, enhances thermogenesis",
        },
        {
          name: "Guarana Seed Extract [22% Caffeine]",
          description:
            "Supports lipid metabolism, reduces fat tissue, suppresses appetite, energizes",
        },
        {
          name: "Natural Caffeine Anhydrous",
          description:
            "Stimulates thermogenesis, supports metabolism and digestion, increases performance",
        },
        {
          name: "Black Pepper Fruit Extract [95% Piperine] – BioPerine®",
          description:
            "Enhances metabolism, supports digestion, combats constipation",
        },
        {
          name: "Vitamin B6",
          description:
            "Accelerates fat and carbohydrate metabolism, supports weight management",
        },
        {
          name: "Pantothenic Acid",
          description:
            "Supports energy metabolism, reduces fatigue, improves performance",
        },
        {
          name: "Zinc",
          description:
            "Supports fat and carbohydrate metabolism, maintains proper weight, increases insulin sensitivity",
        },
      ],
    },
    {
      id: 5,
      name: "NuviaLab Keto",
      price: "$69.99",
      category: "Weight Loss",
      description: "Ketogenic diet support",
      fullDescription:
        "NuviaLab Keto is a comprehensive ketogenic diet support supplement that helps you get into ketosis and lose kilograms. It reduces appetite, supports metabolism, and provides energy for your keto journey.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792732/NuviaLab_Keto_dyavmc.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405654/Nuvialab_Keto_tncisj.png",
      rating: 4.8,
      highlights: [
        "Helps maintain ketosis",
        "Reduces appetite and snacking",
        "Supports metabolism",
        "Accelerates fat reduction",
        "Provides energy and increases stamina",
      ],
      benefits: [
        "Facilitates transition into ketogenic diet",
        "Suppresses hunger and cravings",
        "Enhances fat metabolism",
        "Supports lean muscle mass",
        "Boosts concentration and energy",
      ],
      ingredients: [
        {
          name: "ForsLean® (Indian Nettle Root Extract)",
          description:
            "Increases cAMP, stimulates fat metabolism, supports lean muscle mass",
        },
        {
          name: "Citrin® (Garcinia Cambogia / Malabar Tamarind Extract)",
          description:
            "Thermogenic, inhibits fat formation, suppresses appetite, may improve mood",
        },
        {
          name: "Green Tea Leaf Extract",
          description:
            "Accelerates fat breakdown, supports metabolism and digestion",
        },
        {
          name: "Vitamin B6",
          description:
            "Supports metabolism, fat breakdown, and energy production",
        },
        {
          name: "Guarana Extract",
          description: "Stimulates, increases concentration and energy",
        },
        {
          name: "Chromium",
          description: "Reduces cravings for sweets, supports fat metabolism",
        },
      ],
    },
    {
      id: 6,
      name: "Moringa Actives",
      price: "$44.99",
      category: "Weight Loss",
      description: "Superfood supplement",
      fullDescription:
        "Moringa Actives is the perfect food supplement to support your weight loss efforts. It helps maintain a healthy weight, reduces hunger, supports normal metabolism, regulates blood sugar levels, and supports digestion.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792729/Moringa_Actives_yeityc.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405654/Moringa_Actives_eh7cu0.png",
      rating: 4.5,
      highlights: [
        "Helps to maintain a healthy weight",
        "Reduces the feeling of hunger",
        "Supports normal metabolism",
        "Regulates blood sugar levels",
        "Supports digestion",
      ],
      benefits: [
        "Reduces accumulation of fat tissue",
        "Supports blood sugar maintenance",
        "Regulates blood pressure",
        "Lowers cholesterol levels",
        "Supports liver function and regeneration",
        "Reduces appetite and snacking",
        "Helps maintain stable weight",
      ],
      ingredients: [
        {
          name: "MoringIn™ (Moringa Oleifera Leaf Extract)",
          description:
            "Supports weight management, reduces lipogenesis, stabilizes blood sugar",
        },
        {
          name: "BioPerine® (Piperine 95%)",
          description:
            "Induces thermogenesis, supports digestion, enhances absorption, supports liver function",
        },
      ],
    },
    {
      id: 7,
      name: "Cappuccino MCT",
      price: "$39.99",
      category: "Weight Loss",
      description: "Coffee with MCT oil",
      fullDescription:
        "Cappuccino MCT is coffee that burns fat while tasting amazing! It accelerates calorie burning, reduces fat storage, increases satiety, helps shape the body, and boosts energy and focus.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792726/Cappuccino_MCT_c8fimb.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405623/Cappuccino_MCT_rbjaot.png",
      rating: 4.7,
      highlights: [
        "Accelerates calorie burning",
        "Reduces fat storage",
        "Increases satiety after a meal",
        "Helps shape the body",
        "Boosts energy and focus",
      ],
      benefits: [
        "Supports fat metabolism",
        "Reduces hunger and snacking",
        "Improves body composition",
        "Enhances physical performance",
        "Stimulates beneficial intestinal microflora",
      ],
      ingredients: [
        {
          name: "MCT Oil",
          description:
            "Accelerates calorie burning, reduces fat storage, increases satiety",
        },
        {
          name: "Garcinia Cambogia",
          description:
            "Helps maintain normal blood fat levels, reduces hunger, contains up to 60% HCA",
        },
        {
          name: "Inulin",
          description:
            "Natural prebiotic, supports bowel function, adjusts bowel movements",
        },
        {
          name: "Chromium",
          description:
            "Supports blood sugar maintenance, reduces snacking, aids macronutrient metabolism",
        },
        {
          name: "Guarana",
          description:
            "Supports fat metabolism, contains up to 22% caffeine, reduces fat",
        },
        {
          name: "Caffeine",
          description:
            "Improves focus and concentration, reduces fatigue, increases performance",
        },
        {
          name: "Alg (brown algae + grape seed extract)",
          description:
            "Reduces fat absorption, inhibits lipase & amylase activity, improves body shape",
        },
      ],
    },
    {
      id: 8,
      name: "Nutrigo Lab Burner",
      price: "$59.99",
      category: "Weight Loss",
      description: "Thermogenic formula",
      fullDescription:
        "Nutrigo Lab Burner helps you GET FIT as easily as you can! It supports reduction of fat tissue, inhibits creation of new fat cells, maintains optimal blood sugar levels, speeds up carbohydrate metabolism, and reduces appetite.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792731/Nutrigo_Lab_Burner_vx3nxg.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405653/Nutrigo_Lab_Burner_lf19qe.png",
      rating: 4.8,
      highlights: [
        "Supports reduction of fat tissue",
        "Inhibits creation of new fat cells",
        "Maintains optimal blood sugar levels",
        "Speeds up carbohydrate metabolism",
        "Reduces appetite",
      ],
      benefits: [
        "Helps burn fat tissue and regenerate muscles after workouts",
        "Replenishes energy without storing it as fat",
        "Ideal for athletes, active competitors, and pre-competition preparations",
        "Supports weight reduction periods and offseason workouts",
      ],
      ingredients: [
        {
          name: "BioPerine®",
          description: "Supports nutrient absorption and thermogenesis",
        },
        {
          name: "Citrin®",
          description: "Aids fat metabolism and energy regulation",
        },
        {
          name: "Raspberry Extract",
          description: "Supports fat reduction and antioxidant protection",
        },
        {
          name: "SINETROL® Xpur",
          description: "Promotes thermogenesis and fat tissue reduction",
        },
      ],
    },
    {
      id: 9,
      name: "Keto Actives",
      price: "$62.99",
      category: "Weight Loss",
      description: "Ketogenic lifestyle support",
      fullDescription:
        "Keto Actives is the best supplement for weight management! Recommended for people on a keto diet, it supports metabolism and fat reduction, reduces snacking urges, and provides energy for training and physical activity.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792727/Keto_Actives_xoottt.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405628/Keto_Actives_y2tdlq.png",
      rating: 4.6,
      highlights: [
        "Recommended for people on a keto diet",
        "Supports metabolism and fat reduction",
        "Reduces snacking urges and sudden hunger attacks",
        "Provides energy for training and physical activity",
      ],
      benefits: [
        "Helps lose weight from waist and other difficult areas",
        "Boosts energy for daily exercise",
        "Supports nutritional ketosis",
        "Helps maintain normal blood cholesterol and glucose levels",
      ],
      ingredients: [
        {
          name: "ForsLean® (Indian nettle root extract [10% forskolin])",
          description:
            "Stimulates fat breakdown, supports reduction of body fat and maintenance of lean body mass. Shown to decrease body weight and fat content over 12 weeks.",
        },
        {
          name: "Clarinol® (Conjugated Linoleic Acid - CLA)",
          description:
            "Helps maintain normal blood cholesterol, accelerates fat burning, supports slimming of legs and waist-to-hip ratio.",
        },
        {
          name: "Natural anhydrous caffeine",
          description:
            "Increases concentration and endurance, reduces fatigue after physical activity.",
        },
        {
          name: "Bitter orange fruit extract",
          description:
            "Promotes lipid metabolism, weight control, and supports digestive function.",
        },
        {
          name: "Black pepper fruit extract",
          description:
            "Supports secretion of digestive juices, increases nutrient absorption, regulates bowel movements.",
        },
        {
          name: "Green Tea",
          description:
            "Supports fat metabolism and helps maintain normal body weight.",
        },
        {
          name: "Capsicum extract",
          description:
            "Aids weight management and supports digestive system balance.",
        },
        {
          name: "Chromium",
          description:
            "Maintains normal blood glucose levels and supports macronutrient metabolism.",
        },
      ],
    },
    {
      id: 10,
      name: "Piperinox",
      price: "$47.99",
      category: "Weight Loss",
      description: "Digestive support",
      fullDescription:
        "Piperinox helps you lose weight with the power of piperine! It activates fat and carbohydrate metabolism, reduces appetite and snacking, supports glucose uptake and energy balance, and improves absorption of nutrients.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792733/Piperinox_x7sxkf.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405672/Piperinox_db13ij.png",
      rating: 4.5,
      highlights: [
        "Activates fat and carbohydrate metabolism",
        "Reduces appetite and snacking",
        "Supports glucose uptake and energy balance",
        "Improves absorption of nutrients",
        "One capsule a day is enough",
      ],
      benefits: [
        "Promotes lipolysis and thermogenesis",
        "Regulates leptin and ghrelin for appetite control",
        "Supports muscle regeneration and performance",
        "Maintains energy expenditure",
        "Protects sensitive ingredients via DRcaps® delayed-release capsules",
      ],
      ingredients: [
        {
          name: "BioPerine®",
          description:
            "Patented form of piperine, improves weight loss, nutrient absorption, and metabolism",
        },
      ],
    },
    {
      id: 11,
      name: "Fast Burn Extreme",
      price: "$69.99",
      category: "Weight Loss",
      description: "Extreme fat burning",
      fullDescription:
        "Fast Burn Extreme is an effective fat burner for energy and endurance! It accelerates metabolism of fats and carbohydrates, inhibits formation of fatty tissue, increases endurance during training, improves concentration, and is free from doping agents.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792732/Fast_Burn_Extreme_zcf6sg.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405624/Fast_Burn_Extreme_h5m7hv.png",
      rating: 4.9,
      highlights: [
        "Accelerates metabolism of fats and carbohydrates",
        "Inhibits formation of fatty tissue",
        "Increases endurance during training",
        "Improves concentration",
        "Free from doping agents",
      ],
      benefits: [
        "Supports thermogenesis and fat burning",
        "Releases stored energy from fat tissue",
        "Enhances muscle definition",
        "Improves metabolism by up to 40%",
        "Reduces fat reserves by up to 15% with regular use",
      ],
      ingredients: [
        {
          name: "Indian Nettle Extract",
          description: "Supports fat metabolism and fat reserve reduction",
        },
        {
          name: "Green Tea Extract",
          description:
            "Stimulates fatty acid oxidation and thermogenesis; powerful antioxidant",
        },
        {
          name: "Garcinia Cambogia Extract",
          description:
            "Suppresses appetite, stabilizes blood sugar, blocks fat storage",
        },
        {
          name: "Caffeine",
          description: "Boosts energy, concentration, and endurance",
        },
        {
          name: "Bitter Orange Extract",
          description:
            "Supports digestion, suppresses appetite, increases fat metabolism",
        },
        {
          name: "Capsicum Annuum Extract",
          description: "Activates fat burning and supports digestive system",
        },
        {
          name: "Chromium",
          description: "Reduces snacking and supports macronutrient metabolism",
        },
        {
          name: "Vitamin B6",
          description: "Supports energy metabolism and endocrine function",
        },
      ],
    },
    {
      id: 13,
      name: "Green Barley Plus",
      price: "$41.99",
      category: "Weight Loss",
      description: "Detox supplement",
      fullDescription:
        "Green Barley Plus helps you burn fat, detoxify, and improve your beauty naturally! It helps burn fat, cleanses the body, fights cellulite, and improves skin, hair, and nails.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792726/Green_Barley_Plus_fwcuwp.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405624/Green_Barley_Plus_jqcmrl.png",
      rating: 4.4,
      highlights: [
        "Helps burn fat",
        "Cleanses the body",
        "Fights cellulite",
        "Improves skin, hair, and nails",
      ],
      benefits: [
        "Speeds up metabolism and reduces visceral fat",
        "Supports healthy digestion and bowel movements",
        "Detoxifies the body and liver from toxins",
        "Reduces cellulite and smooths skin",
        "Improves cardiovascular health by regulating cholesterol levels",
        "Rich in antioxidants to delay aging",
      ],
      ingredients: [
        {
          name: "Green Barley",
          description:
            "Provides fiber, promotes digestion, supports detoxification, and slows skin aging",
        },
        {
          name: "Coleus Forskohlii",
          description:
            "Contains forskolin to stimulate lipolysis and fat breakdown",
        },
      ],
    },
    {
      id: 14,
      name: "African Mango",
      price: "$48.99",
      category: "Weight Loss",
      description: "Mango extract",
      fullDescription:
        "The Secret to an Effective Diet is hidden in African Mango. It may help burn fat tissue, removes harmful toxins from the body, reduces appetite, and reduces cholesterol level.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792725/African_Mango_o5vmyk.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405622/African_Mango_tdf6oi.png",
      rating: 4.6,
      highlights: [
        "May help burn fat tissue",
        "Removes harmful toxins from the body",
        "Reduces appetite",
        "Reduces cholesterol level",
      ],
      benefits: [
        "Speeds up fat burning and helps achieve a slim body",
        "Supports appetite control and satiety",
        "Balances leptin and insulin sensitivity to prevent new fat cell formation",
        "Provides essential vitamins, minerals, and antioxidants",
        "Supports healthy metabolic parameters and cardiovascular health",
      ],
      ingredients: [
        {
          name: "African Mango Seed Extract (Irvingia Gabonensis)",
          description:
            "Stimulates fat metabolism, reduces appetite, detoxifies the body, and supports weight loss",
        },
        {
          name: "Polyphenols, Vitamins & Minerals",
          description:
            "Enhance leptin and insulin sensitivity, aid lipolysis, and support overall health",
        },
      ],
    },
    {
      id: 15,
      name: "Acai Berry Extreme",
      price: "$45.99",
      category: "Weight Loss",
      description: "Antioxidant blend",
      fullDescription:
        "Acai Berry Extreme helps you look like you dreamed it! It helps to get rid of excess weight, improves metabolism, gives you more energy, and helps to burn fat.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792725/Acai_Berry_Extreme_vzvgyr.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405621/Acai_Berry_Extreme_ubbgfx.png",
      rating: 4.5,
      highlights: [
        "Helps to get rid of excess weight",
        "Improves metabolism",
        "Gives you more energy",
        "Helps to burn fat",
      ],
      benefits: [
        "Promotes fast weight loss",
        "Cleanses the body of toxins",
        "Reduces 'bad' cholesterol levels",
        "Boosts metabolism and energy levels",
        "Supports overall health while losing weight",
      ],
      ingredients: [
        {
          name: "Acai Berry Extract",
          description:
            "Rich in amino acids, proteins, fiber, and antioxidants; supports fat burning, metabolism, and cleansing",
        },
      ],
    },
    {
      id: 16,
      name: "Green Coffee 5K",
      price: "$43.99",
      category: "Weight Loss",
      description: "Coffee bean extract",
      fullDescription:
        "Green Coffee 5K helps you BURN FAT QUICKER without restrictive diet and painful training. It speeds up metabolism, provides safe weight loss with 5000mg of pure green coffee bean extract, uses 100% organic ingredients, and slows down the aging process.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792725/Green_Coffee_5_zaif7j.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405625/Green_Coffee_5K_gq8nc8.png",
      rating: 4.7,
      highlights: [
        "Speeds up metabolism",
        "Safe weight loss",
        "5000mg of pure green coffee bean extract",
        "100% organic ingredients",
        "Slows down the aging process",
      ],
      benefits: [
        "Promotes fast and natural weight loss",
        "Reduces appetite and stabilizes blood sugar levels",
        "Supports liver function and cholesterol management",
        "Rich in antioxidants that protect cells and slow aging",
        "Does not cause side effects like anxiety or stress",
      ],
      ingredients: [
        {
          name: "Green Coffee Extract",
          description:
            "Rich in chlorogenic acid, accelerates metabolism, burns fat, and provides antioxidant benefits",
        },
      ],
    },
    {
      id: 17,
      name: "Silvets",
      price: "$56.99",
      category: "Weight Loss",
      description: "Weight loss solution",
      fullDescription:
        "Silvets helps you lose weight, like you've always wanted to! It facilitates weight loss, speeds up metabolism, gives more energy, decreases fat retention, and uses 100% organic ingredients.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792735/Silvets_dejqwd.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405674/Silvets_rxxm1a.png",
      rating: 4.8,
      highlights: [
        "Facilitates weight loss",
        "Speeds up metabolism",
        "Gives more energy",
        "Decreases fat retention",
        "100% organic ingredients",
      ],
      benefits: [
        "Decreases hunger and cravings",
        "Supports digestion and fat breakdown",
        "Helps maintain a slim figure",
        "Protects tissues from adiposity",
        "Works from day one with no yo-yo effect",
      ],
      ingredients: [
        {
          name: "Acai berries",
          description: "Speeds up metabolism and provides energy",
        },
        {
          name: "Green tea",
          description:
            "Decreases appetite, speeds up metabolism, aids fat digestion",
        },
        {
          name: "Guarana",
          description: "Instant energy boost",
        },
        {
          name: "Cayenne Powder",
          description: "Increases resting metabolism rate",
        },
        {
          name: "L-Carnitine Tartrate",
          description:
            "Increases energy production, accelerates calorie burning, facilitates muscle shaping",
        },
        {
          name: "Bioperine",
          description: "Improves digestion and absorption of ingredients",
        },
      ],
    },
    {
      id: 18,
      name: "Prostan Plus",
      price: "$58.99",
      category: "Prostate",
      description: "Prostate health",
      fullDescription:
        "Prostan Plus provides male support for prostate health. It supports maintenance of prostate health, supports peak urinary flow, increases comfort in urination, improves renal excretory function, and helps maintain vitality and sexual function.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792735/Prostan_Plus_zelyjm.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405672/Prostan_Plus_mmovvn.png",
      rating: 4.6,
      highlights: [
        "Supports maintenance of prostate health",
        "Supports peak urinary flow",
        "Increases comfort in urination",
        "Improves renal excretory function",
        "Helps maintain vitality and sexual function",
      ],
      benefits: [
        "Regulates comfort and frequency of urination",
        "Supports urinary system, kidneys, and reproductive health",
        "Anti-inflammatory and antibacterial effects",
        "Helps regain male energy and fertility",
      ],
      ingredients: [
        {
          name: "USPlus® Saw Palmetto Extract",
          description:
            "Reduces DHT activity, supports prostate function and urinary flow",
        },
        {
          name: "Pumpkin Seed Extra [20% beta-sitosterol]",
          description:
            "Regulates prostate proliferation, promotes normal urine flow",
        },
        {
          name: "Pomegranate Seed Extract [40% ellagic acid]",
          description:
            "Reduces urinary tract inflammation, antioxidant and homeostatic effects",
        },
        {
          name: "Nettle Leaf Extract [4% polyphenols]",
          description:
            "Supports BPH treatment, diuretic effect, reduces water retention",
        },
        {
          name: "Small Flowered Willow Extract",
          description:
            "Inhibits enzymes responsible for prostate hypertrophy, promotes urine flow",
        },
        {
          name: "African Cherry Bark Extract",
          description:
            "Reduces inflammation, stimulates prostate cell regeneration",
        },
        {
          name: "Tomato Fruit Extract [10% lycopene]",
          description:
            "Antioxidant, anti-inflammatory, potential anti-cancer properties",
        },
        {
          name: "BioPerine®",
          description:
            "Enhances absorption, supports liver function, anti-inflammatory effects",
        },
        {
          name: "Vitamin E",
          description: "Protects cells, supports circulatory and immune system",
        },
        {
          name: "Zinc",
          description:
            "Maintains hormonal balance, supports fertility and immunity",
        },
        {
          name: "Selenium SeLECT®",
          description:
            "Supports sperm formation, reduces prostate inflammation, may reduce prostate cancer risk",
        },
      ],
    },
    {
      id: 19,
      name: "Erisil Plus",
      price: "$62.99",
      category: "Male Enhancement",
      description: "Male enhancement",
      fullDescription:
        "Erisil Plus provides natural support for strong and lasting erections. It helps induce and improve an erection, supports good sexual relations, improves fertility, and helps maintain a healthy prostate.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792728/Erisil_Plus_luixpg.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405622/Erisil_Plus_r1mq5l.png",
      rating: 4.7,
      highlights: [
        "Helps induce and improve an erection",
        "Supports good sexual relations",
        "Improves fertility",
        "Helps maintain a healthy prostate",
        "Vegan, gluten-free, and dairy-free",
      ],
      benefits: [
        "Supports the achievement of an erection",
        "Takes care of the male reproductive system",
        "Minimises stress and boosts energy",
        "Helps increase self-confidence",
        "Increases sexual appetite",
        "Supports testosterone optimization",
      ],
      ingredients: [
        {
          name: "Sabeet™",
          description:
            "Promotes strong and long-lasting erection, improves blood vessel health, and supports normal blood pressure",
        },
        {
          name: "Saffr'Activ®",
          description:
            "Increases libido and fertility, helps maintain emotional balance",
        },
        {
          name: "Citrulline Malate",
          description:
            "Increases nitric oxide levels, improves performance, and enhances potency",
        },
        {
          name: "Macarade™",
          description:
            "Boosts libido, improves fertility, and provides adaptogenic effects",
        },
        {
          name: "Damiana Leaves Extract",
          description:
            "Acts as an aphrodisiac, increases sexual appetite, and reduces stress impact",
        },
        {
          name: "Korean Ginseng Root Extract",
          description:
            "Improves readiness for intercourse, supports vitality, and boosts energy",
        },
        {
          name: "Pumpkin Seed Extract",
          description:
            "Supports prostate health, regulates testosterone, and increases sexual desire",
        },
        {
          name: "Licorice Root Extract",
          description:
            "Supports urinary tract health, counters prostate hypertrophy, increases energy",
        },
        {
          name: "BioPerine®",
          description:
            "Improves nutrient absorption, enhances circulation, and supports immunity",
        },
        {
          name: "Vitamin E",
          description:
            "Supports fertility, hormone production, and strengthens blood vessels",
        },
        {
          name: "Zinc",
          description:
            "Maintains testosterone levels, improves fertility, and supports potency",
        },
      ],
    },
    {
      id: 20,
      name: "NuviaLab Vitality",
      price: "$54.99",
      category: "Male Enhancement",
      description: "Vitality booster",
      fullDescription:
        "NuviaLab Vitality helps you regain your vitality and energy. It increases energy and vitality levels, improves erections and semen quality, maintains normal testosterone levels, supports muscle function and reduces fatigue, and boosts immune system performance.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792733/NuviaLab_Vitality_zk0msk.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405654/NuviaLab_Vitality_vq8bln.png",
      rating: 4.5,
      highlights: [
        "Increases energy and vitality levels",
        "Improves erections and semen quality",
        "Maintains normal testosterone levels",
        "Supports muscle function and reduces fatigue",
        "Boosts immune system performance",
      ],
      benefits: [
        "Enhances male vitality and stamina",
        "Improves concentration and cognitive performance",
        "Supports reproductive and sexual health",
        "Helps combat stress and promotes overall well-being",
        "Made from natural, research-backed ingredients",
      ],
      ingredients: [
        {
          name: "Siberian Ginseng",
          description:
            "Adaptogenic herb that increases energy, supports immune function, enhances libido, and improves semen quality",
        },
        {
          name: "EnoSTIM™",
          description:
            "Improves blood flow, supports erection strength, and promotes vascular health",
        },
        {
          name: "BioPerine®",
          description:
            "Enhances nutrient absorption, boosts metabolism, and supports overall energy",
        },
        {
          name: "Aquamin™ Mg",
          description:
            "Natural marine magnesium complex that supports muscle function and reduces fatigue",
        },
        {
          name: "Selenium SeLECT®",
          description:
            "Supports sperm formation, protects cells from oxidative stress, and promotes hormonal balance",
        },
      ],
    },
    {
      id: 21,
      name: "GigantX",
      price: "$67.99",
      category: "Male Enhancement",
      description: "Performance support",
      fullDescription:
        "GigantX helps improve your size and performance. It may assist in increasing penis size, supports strong and long-lasting erections, improves sexual performance and satisfaction, regulates testosterone levels, and boosts stamina and energy.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792726/GigantX_dyuqrc.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405624/GigantX_x2lazn.png",
      rating: 4.8,
      highlights: [
        "May assist in increasing penis size",
        "Supports strong and long-lasting erections",
        "Improves sexual performance and satisfaction",
        "Regulates testosterone levels",
        "Boosts stamina and energy",
      ],
      benefits: [
        "Enhances erection quality and duration",
        "Improves semen quality and sexual confidence",
        "Accelerates post-ejaculation recovery",
        "Supports prostate health and male hormone balance",
        "Increases desire and overall vitality",
      ],
      ingredients: [
        {
          name: "L-Citrulline Malate 2:1",
          description:
            "Improves blood vessel patency, enhances erections, boosts performance, and accelerates recovery",
        },
        {
          name: "RedNite™",
          description:
            "Improves endurance, prolongs intercourse, enhances performance, and supports healthy cholesterol levels",
        },
        {
          name: "Shilajit Extract [20% Fulvic Acids]",
          description:
            "Supports prostate health, improves semen quality, stimulates spermatogenesis, and has anti-inflammatory properties",
        },
        {
          name: "Korean Ginseng Root Extract [5% Ginsenosides]",
          description:
            "Increases libido, supports erections, boosts physical endurance, and improves focus",
        },
        {
          name: "Ginkgo Biloba Leaf Extract [24% Flavonglycosides]",
          description:
            "Improves circulation, enhances blood flow to the genitals, supports the nervous system, and boosts sexual drive",
        },
        {
          name: "Cayenne Pepper Fruit Extract [2% Capsaicin]",
          description:
            "Supports cardiovascular health, provides antioxidant effects, reduces heart disease risk factors, and relieves pain",
        },
        {
          name: "Black Pepper Fruit Extract [95% Piperine]",
          description:
            "Improves absorption of active ingredients, increases nutrient uptake, enhances blood flow, and boosts libido",
        },
        {
          name: "Caffeine Anhydrous",
          description:
            "Increases stamina, reduces fatigue, and prolongs sexual activity",
        },
        {
          name: "Zinc",
          description:
            "Supports fertility, helps maintain testosterone levels, and improves concentration",
        },
      ],
    },
    {
      id: 22,
      name: "Expansil Cream",
      price: "$49.99",
      category: "Male Enhancement",
      description: "Enhancement cream for men",
      fullDescription:
        "Expansil Cream is the gold standard for men. Enhancement cream designed to improve erection strength, endurance, and confidence.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792729/Expansil_Cream_roriof.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405622/Expansil_Cream_ruqujr.png",
      rating: 4.4,
      highlights: [
        "Contributes to penis size enlargement",
        "Supports a strong and long-lasting erection",
        "Strengthens endurance and performance",
        "Increases libido and sexual drive",
        "Improves overall well-being and confidence",
      ],
      benefits: [
        "Increases size in both length and girth",
        "Improves libido and sexual performance",
        "Totally safe with clinically tested ingredients",
        "Firms skin and enhances natural beauty",
      ],
      ingredients: [
        {
          name: "Rosa Canina Seed Oil",
          description:
            "Nourishes and moisturizes the skin, supporting elasticity and regeneration",
        },
        {
          name: "Mentha Piperita (Peppermint) Leaf Oil",
          description:
            "Provides a refreshing sensation, supports blood circulation and stamina",
        },
        {
          name: "Ginkgo Biloba Leaf Extract",
          description:
            "Improves blood flow and microcirculation, enhancing erection quality",
        },
        {
          name: "Aloe Barbadensis Leaf Juice",
          description:
            "Soothes and hydrates the skin while supporting tissue repair",
        },
        {
          name: "Arnica Montana Flower Extract",
          description:
            "Improves blood flow to tissues and venous circulation, has anti-inflammatory and antioxidant effects, and strengthens blood vessels",
        },
      ],
    },
    {
      id: 23,
      name: "Semaxin",
      price: "$64.99",
      category: "Male Enhancement",
      description: "Male vitality and fertility support",
      fullDescription:
        "Semaxin supports male vitality and fertility. It increases semen volume and quality, strengthens erections and sexual performance, stimulates sexual desire and libido, supports testosterone production, and enhances overall male vitality and stamina.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792734/Semaxin_ucm1hn.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405672/Semaxin_aw11pl.png",
      rating: 4.9,
      highlights: [
        "Increases semen volume and quality",
        "Strengthens erections and sexual performance",
        "Stimulates sexual desire and libido",
        "Supports testosterone production",
        "Enhances overall male vitality and stamina",
      ],
      benefits: [
        "Supports spermatogenesis",
        "Boosts sexual performance",
        "Clinically backed formula with 12 ingredients",
        "Improves fertility and vitality",
      ],
      ingredients: [
        {
          name: "N-Acetyl-L-Cysteine",
          description:
            "Supports glutathione synthesis and protects DNA in sperm, critical for semen quality",
        },
        {
          name: "Astragalus Root Extract (16% Polysaccharides)",
          description:
            "Stimulates sperm mobility, has antioxidant effects, and supports physical and mental well-being",
        },
        {
          name: "Vitamin E, Vitamin B12, Folates, Zinc, Selenium SeLECT®",
          description:
            "Essential vitamins and minerals that enhance spermatogenesis, support fertility, and increase testosterone levels",
        },
        {
          name: "Tribulus Terrestris Fruit Extract (40% Saponins)",
          description:
            "Increases potency and has been shown to improve fertility",
        },
        {
          name: "Saffron Flower Extract",
          description:
            "Stimulates libido, improves erection quality, and supports semen volume",
        },
        {
          name: "Macarade™ (Maca Root Extract)",
          description:
            "Adaptogenic effect that boosts energy, stamina, sexual function, and semen parameters",
        },
      ],
    },
    {
      id: 24,
      name: "Member XXL",
      price: "$71.99",
      category: "Male Enhancement",
      description: "Male enhancement supplement",
      fullDescription:
        "Member XXL is the gold standard for male enhancement. Designed for penis enlargement, sexual performance, and libido support.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792729/Member_XXL_dbkh8k.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405629/Member_XXL_wztvot.png",
      rating: 4.7,
      highlights: [
        "Non-invasive penis enlargement",
        "Thickening and lengthening of the penis up to 9 cm",
        "Improves sexual performance and satisfaction",
        "Enhances sex drive",
        "Fast-acting and safe formula",
      ],
      benefits: [
        "Scientifically designed formula",
        "Optimal dosage for maximum effectiveness",
        "High-quality ingredients",
        "Visible results from first day of use",
      ],
      ingredients: [
        {
          name: "L-Arginine",
          description:
            "Enhances blood flow to the penis, supporting enlargement and stronger erections",
        },
        {
          name: "Fenugreek Extract",
          description: "Supports testosterone levels and sexual desire",
        },
        {
          name: "Saw Palmetto Extract",
          description: "Supports prostate health and improves sexual function",
        },
        {
          name: "Tribulus Terrestris Extract",
          description: "Increases libido and sexual performance",
        },
        {
          name: "Chinese Magnolia Fruit",
          description: "Supports sexual stamina and blood circulation",
        },
        {
          name: "Korean Panax Ginseng",
          description: "Boosts energy, libido, and overall sexual performance",
        },
        {
          name: "Saffron Extract",
          description: "Enhances sexual desire and improves erection quality",
        },
        {
          name: "Black Pepper Extract",
          description:
            "Supports nutrient absorption and boosts the effectiveness of other ingredients",
        },
      ],
    },
    {
      id: 25,
      name: "Eron Plus",
      price: "$59.99",
      category: "Male Enhancement",
      description: "Performance support supplement",
      fullDescription:
        "Eron Plus provides longer, stronger, and more intense sex. It extends sex by up to 30 minutes, removes the basis of erection problems, strengthens and extends erections, improves sexual satisfaction for couples, and is safe and natural with no side effects.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792728/Eron_Plus_yetxdh.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405622/Eron_Plus_lquuai.png",
      rating: 4.6,
      highlights: [
        "Longer sex by up to 30 minutes",
        "Removes the basis of erection problems",
        "Stronger and longer-lasting erections",
        "Improves sexual satisfaction for couples",
        "Safe and natural formula with no side effects",
      ],
      benefits: [
        "Double formula with daily-use and pre-intercourse capsules",
        "100% natural and safe",
        "Scientifically designed for efficacy",
      ],
      ingredients: [
        {
          name: "L-Arginine",
          description:
            "Enhances blood flow to support strong and lasting erections",
        },
        {
          name: "Maca Root",
          description: "Boosts energy, libido, and overall sexual performance",
        },
        {
          name: "Tribulus Terrestris",
          description:
            "Increases testosterone levels, improving sexual desire and performance",
        },
        {
          name: "Korean Ginseng",
          description: "Supports stamina, vitality, and sexual function",
        },
        {
          name: "Fenugreek",
          description: "Enhances libido and overall male sexual health",
        },
      ],
    },
    {
      id: 26,
      name: "Testolan",
      price: "$68.99",
      category: "Testosterone",
      description: "Testosterone booster supplement",
      fullDescription:
        "Testolan boosts testosterone, strength, and vitality naturally. It increases energy and stamina, supports muscle growth and strength, enhances libido and sexual performance, improves sperm production and motility, and protects against aging while supporting overall well-being.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792735/Testolan_qxbbcu.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405674/Testolan_jubyos.png",
      rating: 4.8,
      highlights: [
        "Increases energy and stamina",
        "Supports muscle growth and strength",
        "Enhances libido and sexual performance",
        "Improves sperm production and motility",
        "Protects against aging and supports overall well-being",
      ],
      benefits: [
        "Natural and safe formula",
        "Comprehensive testosterone support",
        "Clinically effective ingredients",
      ],
      ingredients: [
        {
          name: "Fenugreek",
          description: "Supports testosterone production and libido",
        },
        {
          name: "Tribulus Terrestris",
          description: "Enhances testosterone levels and sexual performance",
        },
        {
          name: "D-Aspartic Acid (DAA)",
          description: "Stimulates hormone production and improves vitality",
        },
        {
          name: "Maca Root",
          description: "Increases energy, stamina, and sexual function",
        },
        {
          name: "Korean Ginseng Root",
          description: "Boosts endurance, libido, and overall vitality",
        },
        {
          name: "Ginger Rhizome",
          description: "Supports circulation and testosterone activity",
        },
        {
          name: "Pomegranate Seeds",
          description: "Antioxidant properties and supports sexual health",
        },
        {
          name: "Magnesium",
          description: "Supports muscle function and testosterone synthesis",
        },
        {
          name: "Phosphatidylserine",
          description: "Improves cognitive function and hormonal balance",
        },
        {
          name: "Vitamin E",
          description: "Supports sperm quality and reproductive health",
        },
        {
          name: "Black Pepper",
          description: "Enhances absorption of active ingredients",
        },
      ],
    },
    {
      id: 27,
      name: "Flexomore",
      price: "$52.99",
      category: "Joint Health",
      description: "Joint support supplement",
      fullDescription:
        "Flexomore helps you train without limits by supporting your joints and bones. It supports free and comfortable joint function, reduces morning joint stiffness, improves flexibility and mobility, supports healthy bones and cartilage, speeds up post-workout recovery, and reduces risk of injury.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792731/Flexomore_fzrk2k.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405624/Flexomore_adw4xs.png",
      rating: 4.5,
      highlights: [
        "Supports free and comfortable joint function",
        "Reduces morning joint stiffness",
        "Improves flexibility and mobility",
        "Supports healthy bones and cartilage",
        "Speeds up post-workout recovery",
        "Reduces risk of injury",
      ],
      benefits: [
        "Innovative formula with 10 high-quality ingredients",
        "Delicious orange and peach flavor",
        "Clinically supported ingredients",
      ],
      ingredients: [
        {
          name: "Tendoforte®",
          description:
            "Collagen peptides support cartilage, tendons, and ligaments, improving mobility and reducing injury risk",
        },
        {
          name: "uC3 Clear® (Curcuma longa)",
          description:
            "Anti-inflammatory and antioxidant effects reduce joint pain and inflammation",
        },
        {
          name: "Boswellin® WS (Boswellia serrata)",
          description: "Relieves inflammation and supports joint health",
        },
        {
          name: "Aquamin™",
          description:
            "Supports bone mineralization, cartilage health, and muscle-bone integrity",
        },
        {
          name: "Glucosamine sulphate 2KCl",
          description:
            "Prevents cartilage degradation and supports joint structure",
        },
        {
          name: "Methylsulfonylmethane (MSM)",
          description:
            "Reduces inflammation, improves joint mobility, and alleviates muscle and joint pain",
        },
      ],
    },
    {
      id: 28,
      name: "NuviaLab Flex",
      price: "$56.99",
      category: "Joint Health",
      description: "Joint and bone support supplement",
      fullDescription:
        "NuviaLab Flex provides advanced joint and bone support. Go for healthy and functioning joints with 11 natural ingredients that support joint flexibility, reduce inflammation, strengthen bones, and improve mobility.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792731/NuviaLab_Flex_cgvaqg.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405653/NuviaLab_Flex_s2rl1p.png",
      rating: 4.7,
      highlights: [
        "Supports free and comfortable joint function",
        "Maintains joint flexibility and health",
        "Strengthens bones and supports collagen production",
        "Helps control inflammatory reactions",
        "Improves mobility and joint lubrication",
        "Reduces joint pain and stiffness",
      ],
      benefits: [
        "Comprehensive joint support",
        "Anti-inflammatory ingredients",
        "Supports collagen and connective tissues",
        "Laboratory tested for quality",
      ],
      ingredients: [
        {
          name: "Boswellin®",
          description:
            "Supports joint flexibility, reduces stiffness, and promotes comfortable movement",
        },
        {
          name: "Curcumin C3 Complex®",
          description:
            "Anti-inflammatory and antioxidant properties support joint and bone health",
        },
        {
          name: "Glucosamine Sulphate 2KCl",
          description:
            "Supports cartilage regeneration and maintains proper joint structure",
        },
        {
          name: "Papain from Papaya Fruit Extract",
          description: "Analgesic, anti-inflammatory, and antioxidant effects",
        },
        {
          name: "Chondroitin Sulfate [90%]",
          description:
            "Reduces friction, improves joint lubrication, and alleviates joint pain",
        },
        {
          name: "Vitamin C",
          description: "Supports collagen production and cartilage health",
        },
        {
          name: "Methylsulfonylmethane (MSM)",
          description:
            "Stimulates collagen fibers, improves joint lubricant, and accelerates recovery",
        },
        {
          name: "Vitamin D",
          description: "Reduces inflammation and strengthens bones",
        },
        {
          name: "Shilajit Extract [20% Fulvic Acids]",
          description:
            "Supports bone strength and accelerates joint regeneration",
        },
        {
          name: "Manganese",
          description:
            "Supports connective tissue formation and protects against oxidative stress",
        },
        {
          name: "Bromelain from Pineapple Fruit Extract",
          description:
            "Analgesic, anti-inflammatory, and supports joint healing",
        },
      ],
    },
    {
      id: 29,
      name: "ProFlexen",
      price: "$61.99",
      category: "Joint Health",
      description: "Natural dietary supplement for joint health",
      fullDescription:
        "ProFlexen helps you move freely and maintain healthy joints. Natural dietary supplement supporting joint health, flexibility, and bone strength, enriched with UC-II® collagen and other effective ingredients.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792734/ProFlexen_wc6rnb.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405673/ProFlexen_h9uxho.png",
      rating: 4.6,
      highlights: [
        "Supports free and comfortable joint movement",
        "Maintains joint flexibility and overall health",
        "Strengthens bones and supports collagen production",
        "Prevents morning joint stiffness",
        "Protects joints during intensive exercise",
      ],
      benefits: [
        "UC-II® collagen clinically tested",
        "Anti-inflammatory and mobility support",
        "Bone and connective tissue support",
      ],
      ingredients: [
        {
          name: "UC-II®",
          description:
            "Undenatured type II collagen, improves cartilage health and joint flexibility, clinically tested",
        },
        {
          name: "Boswellia Serrata Resin Extract",
          description:
            "Supports joint comfort and flexibility, reduces inflammation",
        },
        {
          name: "Curcuma Longa Rhizomes Extract",
          description:
            "Supports healthy bones and joints, anti-inflammatory properties",
        },
        {
          name: "Ginger Rhizomes Extract",
          description: "Improves joint mobility and prevents morning stiffness",
        },
        {
          name: "Vitamin C",
          description:
            "Supports collagen synthesis and proper cartilage function",
        },
        {
          name: "Manganese",
          description:
            "Aids formation of connective tissues and supports bone strength",
        },
      ],
    },
    {
      id: 30,
      name: "Folicerin",
      price: "$48.99",
      category: "Hair Loss",
      description: "Advanced anti-hair loss shampoo",
      fullDescription:
        "Folicerin provides thicker, stronger hair with daily use. Advanced anti-hair loss shampoo that strengthens hair, stimulates growth, and improves scalp microcirculation.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792731/Folicerin_vtjgpk.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405624/Folicerin_o6tayk.png",
      rating: 4.4,
      highlights: [
        "Cleanses and conditions hair while nourishing follicles",
        "Prevents excessive hair loss",
        "Stimulates new hair growth on the sides and top of the head",
        "Makes hair thicker, stronger, and shinier",
        "Improves scalp microcirculation",
      ],
      benefits: [
        "Nano T-Growth Hair technology",
        "Black pepper extract inhibits 5-alpha-reductase",
        "Licorice extract prevents scalp inflammation",
        "Burdock extract supports scalp health",
        "Ginseng extract stimulates hair regeneration",
      ],
      ingredients: [
        {
          name: "Nano T-Growth Hair Technology",
          description:
            "Encapsulated natural ingredients for stabilized and effective hair regrowth",
        },
        {
          name: "Black Pepper Extract",
          description:
            "Inhibits 5-alpha-reductase, reducing conversion of testosterone to DHT that causes hair loss",
        },
        {
          name: "Licorice Extract",
          description:
            "Contains glycyrrhizinic acid to prevent scalp inflammation and stimulate proper hair growth cycle",
        },
        {
          name: "Burdock Extract",
          description:
            "Supports scalp health, improves microcirculation, and nourishes hair follicles",
        },
        {
          name: "Ginseng Extract",
          description:
            "Stimulates hair regeneration, strengthens strands, and improves hair structure and appearance",
        },
      ],
    },
    {
      id: 31,
      name: "Folisin",
      price: "$53.99",
      category: "	Hair Loss",
      description: "Natural hair supplement",
      fullDescription:
        "Folisin supports stronger, healthier hair naturally. Natural hair supplement that supports hair growth, reduces hair loss, maintains pigmentation, and helps keep testosterone levels.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792725/Folisin_bevxu4.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405624/Folisin_cym5qk.png",
      rating: 4.6,
      highlights: [
        "Supports natural hair growth",
        "Reduces intensity of hair loss",
        "Maintains normal hair pigmentation",
        "Helps maintain proper testosterone levels",
      ],
      benefits: [
        "Stimulates hair follicle growth",
        "Blocks hair loss pathways",
        "Improves hair health and density",
      ],
      ingredients: [
        {
          name: "AnaGain™ Nu",
          description:
            "Derived from pea sprouts; stimulates skin cells to produce new hair",
        },
        {
          name: "Saw Palmetto",
          description:
            "Contains 25% fatty acids; promotes hair growth and supports male reproductive and prostate health",
        },
        {
          name: "PhosphaMax",
          description:
            "Phosphatidic acid that supports hair growth and induces the anagen (growth) phase",
        },
        {
          name: "BioPerine®",
          description:
            "Black pepper extract that enhances absorption of Beta-Carotene and Selenium",
        },
        {
          name: "EVNolMax™",
          description:
            "Tocopherol blend (Vitamin E + Tocotrienol) that supports new hair growth and prevents hair loss",
        },
        {
          name: "Pumpkin Seed Extract",
          description:
            "Rich in beta-sitosterol; blocks 5-alpha reductase and works synergistically with Saw Palmetto",
        },
        {
          name: "Vitamin & Mineral Complex",
          description:
            "Includes Vitamin A, Biotin, Zinc, Copper, Selenium SeLECT®; maintains healthy hair, pigmentation, testosterone levels",
        },
      ],
    },
    {
      id: 32,
      name: "Locerin",
      price: "$57.99",
      category: "Hair Loss",
      description: "Advanced dietary supplement for women",
      fullDescription:
        "Locerin helps you take care of your hair naturally. Advanced dietary supplement for women that supports hair growth, reduces hair loss, strengthens hair structure, and improves hair color.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792727/Locerin_gd8m1q.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405628/Locerin_zjgaju.png",
      rating: 4.7,
      highlights: [
        "Protects against hair loss",
        "Effectively supports hair growth",
        "Makes hair healthier and shinier",
        "Strengthens hair structure and color",
      ],
      benefits: [
        "Stimulates dermal papilla cells",
        "Shortens resting phase of hair",
        "Promotes growth phase",
        "Improves hair density",
      ],
      ingredients: [
        {
          name: "AnaGain™ Nu",
          description:
            "Stimulates specific signaling molecules in dermal papilla cells, increasing Noggin and FGF7 levels",
        },
        {
          name: "Horsetail",
          description:
            "Rich in natural silica; supports hair growth and the appearance of skin and nails",
        },
        {
          name: "Copper",
          description:
            "Supports immune system, protects DNA and proteins from oxidative stress, maintains normal pigmentation",
        },
        {
          name: "Alfalfa Leaf",
          description:
            "Improves hair structure and appearance; helps maintain natural hair color",
        },
        {
          name: "Bamboo Stem",
          description:
            "Source of absorbable silica; strengthens hair and nails",
        },
        {
          name: "Selenium SeLECT®, Biotin, Zinc",
          description:
            "A complex of vitamins and minerals that nourishes hair and maintains overall hair health",
        },
        {
          name: "BioPerine®",
          description:
            "Patented piperine extract; enhances absorption of selenium, vitamin B6, iron, and beta-carotene",
        },
        {
          name: "Nettle Leaf",
          description:
            "Natural source of vitamins and minerals that strengthens hair, skin, and nails",
        },
      ],
    },
    {
      id: 33,
      name: "Profolan",
      price: "$62.99",
      category: "Hair Loss",
      description: "Hair growth formula for men",
      fullDescription:
        "Profolan helps you fight hair loss naturally. Hair growth formula for men that stimulates hair growth, strengthens hair tone, and prevents hair loss.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792734/Profolan_waftxk.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405672/Profolan_qubckt.png",
      rating: 4.8,
      highlights: [
        "Stimulates hair growth",
        "Strengthens hair and natural tone",
        "Blocks DHT to prevent hair loss",
        "Improves scalp blood supply",
        "Strengthens hair follicles",
      ],
      benefits: [
        "Innovative Grow3 formula",
        "Combines natural ingredients",
        "Strengthens hair follicles",
        "Maintains natural hair color",
      ],
      ingredients: [
        {
          name: "Nettle",
          description:
            "Contains chemical compounds that stop hair loss and nourish hair roots",
        },
        {
          name: "Field Horsetail",
          description:
            "Provides essential vitamins and microelements to strengthen hair from the inside",
        },
        {
          name: "L-cysteine",
          description:
            "An amino acid essential for hair growth and cell regeneration",
        },
        {
          name: "Vitamins and Minerals",
          description:
            "Includes Vitamin E, B6, Zinc, and Copper to support hair growth and prevent follicle constriction",
        },
      ],
    },
    {
      id: 34,
      name: "Bulk Extreme",
      price: "$74.99",
      category: "Bodybuilding",
      description: "Muscle-building supplement",
      fullDescription:
        "Bulk Extreme takes your training to the next level. Muscle-building supplement designed to increase muscle mass, strength, testosterone levels, and physical performance.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792727/Bulk_Extreme_n6ctc0.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405622/Bulk_Extreme_gm3vrm.png",
      rating: 4.9,
      highlights: [
        "Supports extreme muscle growth",
        "Increases strength and stamina",
        "Boosts testosterone levels",
        "Reduces fatigue and tiredness",
        "Enhances sexual performance",
      ],
      benefits: [
        "Stimulates muscle growth",
        "Improves blood flow",
        "Supports hormone balance",
        "Increases endurance",
      ],
      ingredients: [
        {
          name: "Momordicin®",
          description:
            "Bitter melon extract containing charantin and bitter compounds; supports muscle growth",
        },
        {
          name: "Sabeet™",
          description:
            "Beet root extract standardized to 2% nitrates; improves aerobic capacity",
        },
        {
          name: "Nettle Leaf Extract",
          description:
            "Natural DHT blocker; provides energy and supports vitality",
        },
        {
          name: "Alfalfa Herb Extract",
          description: "Supports vitality, stamina, and hormonal balance",
        },
        {
          name: "Ginseng Siberian Root Extract",
          description: "Improves adaptive abilities, reduces fatigue",
        },
        {
          name: "Pumpkin Seed Extract",
          description:
            "Supports muscle tissue development and male hormone production",
        },
        {
          name: "Vitamin B12",
          description:
            "Supports red blood cell production and reduces exhaustion",
        },
        {
          name: "Selenium SeLECT®",
          description: "Supports thyroid function and sperm formation",
        },
        {
          name: "Maca Root Extract",
          description: "Adaptogenic properties; supports cognitive function",
        },
        {
          name: "Shilajit Extract",
          description: "Supports skeletal system and hormonal activity",
        },
        {
          name: "Saw Palmetto Fruit Extract",
          description: "Supports prostate health and blocks DHT",
        },
        {
          name: "Vitamin B6",
          description: "Participates in fat and carbohydrate metabolism",
        },
        {
          name: "Zinc",
          description:
            "Maintains normal testosterone levels and supports fertility",
        },
      ],
    },
    {
      id: 35,
      name: "Nutrigo Lab Strength",
      price: "$69.99",
      category: "Bodybuilding",
      description: "Strength booster supplement",
      fullDescription:
        "Nutrigo Lab Strength charges your body before workouts! Strength booster supplement designed to increase muscle strength, endurance, and workout performance.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792732/Nutrigo_Lab_Strength_ntxq5n.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405628/Mass_Extreme_nnchnq.png",
      rating: 4.8,
      highlights: [
        "Increases metabolism speed",
        "Improves exercise performance",
        "Enhances muscle strength and endurance",
        "Reduces workout-related fatigue",
        "No caffeine crash effect",
      ],
      benefits: [
        "Optimizes muscle pump",
        "Increases strength and endurance",
        "Reduces muscle stress",
        "Enhances cellular energy",
      ],
      ingredients: [
        {
          name: "Creatine",
          description:
            "Enhances cellular energy and increases workout performance",
        },
        {
          name: "RedNite™",
          description:
            "Part of the NEURO Stimulant & Adaptogenic Blend; supports endurance",
        },
        {
          name: "EnXtra™",
          description:
            "Adaptogenic blend ingredient to reduce fatigue and improve focus",
        },
        {
          name: "Citrulline Malate",
          description: "Supports vascular function and improves muscle pump",
        },
      ],
    },
    {
      id: 36,
      name: "Mass Extreme",
      price: "$72.99",
      category: "Bodybuilding",
      description: "Mass gainer supplement",
      fullDescription:
        "Mass Extreme is the only supplement you need to build muscle mass. Mass gainer supplement designed to build muscle mass, improve strength, and enhance workout performance.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792728/Mass_Extreme_jgsd7v.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405628/Mass_Extreme_nnchnq.png",
      rating: 4.7,
      highlights: [
        "Maximum increase in muscle mass by up to 96%",
        "Greater strength by up to 147%",
        "Train longer and more intensely with 30% more strength",
        "Perform 4 times more reps during training",
        "Better muscle sculpting and physique",
      ],
      benefits: [
        "Stimulates muscle growth",
        "Boosts energy",
        "Enhances endurance",
        "Increases testosterone",
      ],
      ingredients: [
        {
          name: "Fenugreek Extract",
          description:
            "Increases glycogen synthesis in muscle cells to boost muscle bulk",
        },
        {
          name: "4-Amino Butyric Acid (GABA)",
          description: "Enhances natural growth hormone secretion",
        },
        {
          name: "D-Aspartic Acid (DAA)",
          description: "Amino acid that increases testosterone levels",
        },
        {
          name: "Phosphatidic Acid (PA)",
          description: "Stimulates growth and increases muscle volume",
        },
        {
          name: "5-Deoxy-Adenosylcobalamin",
          description: "Supports muscle growth during exercise",
        },
        {
          name: "Maca Root Extract",
          description:
            "Increases energy levels and strengthens physical stamina",
        },
      ],
    },
    {
      id: 37,
      name: "NuviaLab Relax",
      price: "$46.99",
      category: "Stress",
      description: "Advanced stress relief supplement",
      fullDescription:
        "NuviaLab Relax helps you forget about stress and enjoy life! Advanced supplement designed to relieve stress, improve mood, and support cognitive function and sleep quality.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792732/NuviaLab_Relax_mrqjsu.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405654/NuviaLab_Relax_qt6dm6.png",
      rating: 4.5,
      highlights: [
        "Facilitates relaxation and maintains a sense of well-being",
        "Supports calmness in stressful situations",
        "Improves falling asleep and sleep quality",
        "Supports brain function and cognitive abilities",
        "Helps in performing daily tasks effectively",
      ],
      benefits: [
        "Calms the nervous system",
        "Reduces stress effects",
        "Improves focus",
        "Supports sleep",
      ],
      ingredients: [
        {
          name: "Calmomix®",
          description:
            "Standardized blend of valerian root, lemon balm leaves, passion flower, and hop cones",
        },
        {
          name: "Rhodiolife®",
          description:
            "Golden root extract with adaptogenic properties that supports calmness",
        },
        {
          name: "Vitamin and Mineral Complex",
          description:
            "Contains magnesium, thiamin, riboflavin, niacin, vitamin B6, folic acid, vitamin B12",
        },
      ],
    },
    {
      id: 38,
      name: "Restilen",
      price: "$51.99",
      category: "Stress",
      description: "Advanced supplement for stress management",
      fullDescription:
        "Restilen helps you forget about stress and start living to the fullest. Advanced supplement for stress management, emotional balance, and overall well-being.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792734/Restilen_x2lzjq.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405674/Restilen_oopsha.png",
      rating: 4.6,
      highlights: [
        "Increases resistance to stress",
        "Helps maintain a positive mood",
        "Reduces stress symptoms",
        "Reduces fatigue and exhaustion",
        "Supports maintenance of energy and vitality",
      ],
      benefits: [
        "Strengthens immunity",
        "Fights infections",
        "Reduces fatigue",
        "Protects cells",
      ],
      ingredients: [
        {
          name: "Serenzo™",
          description:
            "Extract of sweet orange peel that regulates stress by acting on A2A and D2 receptors",
        },
        {
          name: "Rhodiolife®",
          description:
            "Rhodiola Rosea Root Extract with adaptogenic properties",
        },
        {
          name: "Saffr'Activ®",
          description:
            "Saffron Stigma Extract that helps maintain a positive mood",
        },
        {
          name: "SOD B Extramel®",
          description: "Cantaloupe melon juice concentrate that reduces stress",
        },
        {
          name: "Magnesium - Aquamin™ Mg",
          description: "Supports nervous system and reduces fatigue",
        },
        {
          name: "Vitamins B1, B2, B3, B6, B12, Pantothenic Acid",
          description: "Support nervous system function and energy metabolism",
        },
        {
          name: "Chinese Tea Leaf Extract [98% L-theanine]",
          description: "Supports concentration and alertness",
        },
      ],
    },
    {
      id: 39,
      name: "Zinamax",
      price: "$49.99",
      category: "Acne",
      description: "Advanced acne treatment supplement",
      fullDescription:
        "Zinamax helps you fall in love with your skin all over again! Advanced acne treatment supplement that improves skin condition, reduces sebum, and soothes inflammation.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792736/Zinamax_csovx8.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405690/Zinamax_xolpf3.png",
      rating: 4.7,
      highlights: [
        "Improve the skin's condition",
        "Purify the skin",
        "Reduce sebum production",
        "Soothe inflammation",
        "Reduce the appearance of blemishes",
        "Promotes wound healing",
      ],
      benefits: [
        "Reduces acne intensity",
        "Improves collagen synthesis",
        "Hydrates skin",
        "Supports immune system",
      ],
      ingredients: [
        {
          name: "Lactoferrin",
          description:
            "Antibacterial, antiviral, antifungal and anti-inflammatory protein",
        },
        {
          name: "Wild Pansy Flower Extract [5% flavones]",
          description: "Reduces imperfections and cleanses the skin",
        },
        {
          name: "Wild Rosehip Extract",
          description: "Promotes wound healing and collagen production",
        },
        {
          name: "Nettle Leaf Extract [4% polyphenols]",
          description:
            "Reduces sebum secretion and has anti-inflammatory effects",
        },
        {
          name: "EVNolMax",
          description: "Hydrates the skin and improves skin appearance",
        },
        {
          name: "Centellin®",
          description:
            "Enhances collagen synthesis and accelerates wound healing",
        },
        {
          name: "BioPerine®",
          description: "Supports absorption of other ingredients",
        },
        {
          name: "Vitamin and Mineral Complex",
          description:
            "Selenium SeLECT®, Vitamin A, Zinc, Vitamin E, Vitamin B6",
        },
      ],
    },
    {
      id: 40,
      name: "Nonacne",
      price: "$54.99",
      category: "Acne",
      description: "Natural acne prevention and treatment supplement",
      fullDescription:
        "Nonacne provides help for skin acne! Natural acne prevention and treatment supplement that targets the root cause of acne, reduces sebum, and improves skin condition.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792730/Nonacne_wfx7w7.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405653/Nonacne_c1lfur.png",
      rating: 4.4,
      highlights: [
        "Effectively supports skin affected by all types of acne",
        "Anti-inflammatory and antibacterial properties",
        "Helps eliminate spots, blackheads, papules, pustules, and redness",
        "Prevents the appearance of new acne lesions",
        "Targets the root cause of acne",
        "Promotes a clean, healthy complexion",
      ],
      benefits: [
        "Treats existing acne",
        "Reduces inflammation",
        "Regulates sebum production",
        "Prevents new blemishes",
      ],
      ingredients: [
        {
          name: "Red Clover",
          description: "Reduces excess sebum and corrects hormonal imbalances",
        },
        {
          name: "Sarsaparilla",
          description: "Herb with antibacterial and antifungal properties",
        },
        {
          name: "Grape Seed Extract",
          description: "Rich in OPCs and antioxidants; smooths skin",
        },
        {
          name: "Nettle Leaf Extract",
          description: "Anti-inflammatory, antibacterial, and antioxidant",
        },
        {
          name: "Vitamin C",
          description: "Promotes skin regeneration and reduces irritation",
        },
        {
          name: "Zinc",
          description: "Essential for healthy skin; prevents acne formation",
        },
        {
          name: "Lycopene",
          description: "Powerful antioxidant that protects skin cells",
        },
        {
          name: "Copper",
          description: "Supports skin regeneration",
        },
        {
          name: "Vitamins A, E, B5, B6",
          description:
            "Support skin cell function and regulate hormonal activity",
        },
      ],
    },
    {
      id: 41,
      name: "EnduNAD",
      price: "$79.99",
      category: "Longevity",
      description: "NAD+ booster",
      fullDescription:
        "EnduNAD provides the energy of youth in every capsule. Multi-ingredient food supplement for people who want to maintain proper NAD+ levels.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792729/EnduNAD_bcttod.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405622/EnduNAD_t4bfrs.png",
      rating: 4.8,
      highlights: [
        "Multi-ingredient NAD+ level booster",
        "Rich in NAD+ precursors",
        "Supports normal energy metabolism",
        "Reduces feelings of fatigue and tiredness",
        "Aids in the proper synthesis of cysteine",
      ],
      benefits: [
        "Supports NAD+ production",
        "Boosts cellular energy",
        "Reduces fatigue",
        "Supports metabolism",
      ],
      ingredients: [
        {
          name: "Fenugreek Seed Extract [2% Trigonelline]",
          description:
            "Supports thyroid hormone production and helps regulate metabolism",
        },
        {
          name: "L-Tryptophan",
          description: "Amino acid that supports thyroid hormone synthesis",
        },
        {
          name: "Chamomile Flower Extract [5% Apigenins]",
          description: "Provides antioxidant support and promotes relaxation",
        },
        {
          name: "Green Tea Leaf Extract [40% EGCG]",
          description: "Strong antioxidant that supports metabolism",
        },
        {
          name: "Grape Vine Fruit Extract [2% Resveratrol]",
          description: "Powerful antioxidant that supports cellular health",
        },
        {
          name: "Alpha Lipoic Acid (ALA)",
          description: "Supports energy production and antioxidant defense",
        },
        {
          name: "Black Pepper Fruit Extract [95% Piperine] – BioPerine®",
          description: "Enhances absorption of nutrients",
        },
        {
          name: "Niacin",
          description: "Essential for NAD+ production and energy metabolism",
        },
        {
          name: "Vitamin B6",
          description: "Supports metabolism and reduces fatigue",
        },
      ],
    },
    {
      id: 42,
      name: "Uticarin",
      price: "$47.99",
      category: "Urinary Tract Support",
      description: "Urinary support supplement",
      fullDescription:
        "Uticarin is your natural shield against infection. Natural urinary health supplement that helps maintain proper kidney and urinary tract function, supports immune health, and aids in the natural elimination of bacteria.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792735/Uticarin_sdi5pw.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405674/Uticarin_thj58q.png",
      rating: 4.5,
      highlights: [
        "Supports urine excretion",
        "Supports urinary tract function",
        "Helps maintain proper kidney function",
        "Helps clear bacteria from the urinary tract",
        "Supports immune system function",
        "Contains natural, antibiotic-free ingredients",
      ],
      benefits: [
        "Helps remove bacteria",
        "Supports kidney function",
        "Strengthens immune system",
        "Reduces inflammation",
      ],
      ingredients: [
        {
          name: "D-Mannose",
          description:
            "A natural sugar that prevents bacteria from adhering to the bladder walls",
        },
        {
          name: "Cranberry Fruit Extract [10% Proanthocyanidin] – Exocyan™ Cran 10G",
          description:
            "Supports urinary tract health by inhibiting bacterial growth",
        },
        {
          name: "Green Tea Leaf Extract [40% EGCG]",
          description:
            "Provides anti-inflammatory support and promotes proper urine excretion",
        },
        {
          name: "Dandelion Root Extract",
          description: "Natural diuretic that supports kidney function",
        },
        {
          name: "Rosehip Fruit Extract",
          description: "Rich source of Vitamin C that supports immune function",
        },
        {
          name: "Nettle Leaf Extract [4% Polyphenols]",
          description:
            "Supports kidney function and helps remove excess fluids",
        },
        {
          name: "Vitamin D – Vita-algae D®",
          description: "Supports immune system and overall health",
        },
      ],
    },
    {
      id: 43,
      name: "Crave Burner",
      price: "$44.99",
      category: "Appetite Suppressant",
      description: "Appetite suppressant",
      fullDescription:
        "Crave Burner is your appetite buster. Natural appetite suppressant designed to help reduce hunger, increase satiety, and support weight management.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792727/Crave_Burner_xs590b.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405623/Crave_Burner_oevdjm.png",
      rating: 4.6,
      highlights: [
        "Contributes to reducing appetite",
        "Increases feelings of fullness and satiety",
        "Reduces fat stores and boosts metabolism",
        "Supports weight reduction and control",
        "Improves overall well-being and motivation",
        "Helps control cravings for sweet or fatty foods",
      ],
      benefits: [
        "Reduces appetite within 15 minutes",
        "Provides long-lasting satiety",
        "Helps limit calorie intake",
        "No side effects",
      ],
      ingredients: [
        {
          name: "Carolean™",
          description:
            "Synergistic blend of prickly pear fruit extract and carob seed extract that suppresses appetite",
        },
      ],
    },
    {
      id: 44,
      name: "Eyevita Plus",
      price: "$52.99",
      category: "Eye Health",
      description: "Eye health supplement",
      fullDescription:
        "Eyevita Plus provides comprehensive support for your eyesight! Premium eye health supplement with 9 powerful ingredients that support retinal function, protect against blue light, and reduce symptoms of eye strain and dryness.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792729/Eyevita_Plus_myrqiw.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405623/Eyevita_Plus_khxaei.png",
      rating: 4.7,
      highlights: [
        "Helps maintain normal vision",
        "Supports retinal health and function",
        "Reduces inflammation and dry eye symptoms",
        "Protects against blue light from screens",
        "Improves tear gland function and tear film production",
        "Strengthens the retina and visual acuity",
      ],
      benefits: [
        "Reduces eye fatigue",
        "Protects from blue light",
        "Supports tear production",
        "Improves visual acuity",
      ],
      ingredients: [
        {
          name: "MaquiBright®",
          description:
            "Maqui Berry Extract that helps protect tear glands from oxidative stress",
        },
        {
          name: "Lutelex®",
          description:
            "Marigold Flower Extract containing lutein and zeaxanthin that protect the retina",
        },
      ],
    },
    {
      id: 45,
      name: "Prenatalin",
      price: "$58.99",
      category: "Prenatal Care",
      description: "Prenatal supplement",
      fullDescription:
        "Prenatalin provides comprehensive prenatal support for mother and baby. Premium prenatal supplement designed to support the health of both mother and baby during pregnancy and breastfeeding.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792734/Prenatalin_kpz6fj.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405672/Prenatalin_ot5x6g.png",
      rating: 4.9,
      highlights: [
        "Supports foetal development",
        "Maintains maternal health",
        "Supports postpartum recovery",
        "Contains essential nutrients for pregnancy",
        "Supports breastfeeding",
      ],
      benefits: [
        "Promotes proper foetal development",
        "Supports maternal health",
        "Enhances postpartum recovery",
        "Provides essential nutrients",
      ],
      ingredients: [
        {
          name: "Quatrefolic®",
          description:
            "Innovative, biologically active form of folic acid essential for normal foetal development",
        },
        {
          name: "Fish Oil (Omega-3)",
          description:
            "Top-quality fish oil, a natural source of DHA and EPA fatty acids",
        },
        {
          name: "SeleniumSeLECT®",
          description:
            "Highly bioavailable selenium form supporting thyroid and immune health",
        },
        {
          name: "VitaMK7®",
          description:
            "Naturally-derived vitamin K for bone and cardiovascular health",
        },
        {
          name: "Aquamin™ TG (Calcium Complex)",
          description:
            "Multi-mineral complex from marine algae providing natural calcium",
        },
        {
          name: "Magnesium (Aquamin™ Mg TG)",
          description:
            "Natural magnesium from seawater, vital during and after pregnancy",
        },
        {
          name: "Choline",
          description:
            "Helps prevent neural tube defects and supports brain development",
        },
        {
          name: "Iodine",
          description: "Supports thyroid hormone production and foetal growth",
        },
        {
          name: "Vitamin A",
          description:
            "Supports tissue growth and development of vision, lungs, and bones",
        },
      ],
    },
    {
      id: 46,
      name: "NuviaLab Female Fertility",
      price: "$64.99",
      category: "Female Health",
      description: "Fertility support supplement",
      fullDescription:
        "NuviaLab Female Fertility supports female reproductive health and fertility. Comprehensive supplement designed to support hormonal balance, egg quality, and overall fertility.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405653/NuviaLab_Female_Fertility_bvfgxi.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405653/NuviaLab_Female_Fertility_bvfgxi.png",
      rating: 4.8,
      highlights: [
        "Supports hormonal balance",
        "Improves egg quality",
        "Supports reproductive health",
        "Enhances fertility naturally",
      ],
      benefits: [
        "Balances hormones",
        "Improves fertility",
        "Supports reproductive system",
        "Natural ingredients",
      ],
      ingredients: [
        {
          name: "Myo-Inositol",
          description: "Supports hormonal balance and egg quality",
        },
        {
          name: "Folate",
          description:
            "Essential for reproductive health and foetal development",
        },
        {
          name: "Vitamin D",
          description: "Supports fertility and hormonal function",
        },
      ],
    },
    {
      id: 47,
      name: "NuviaLab Sugar Control",
      price: "$56.99",
      category: "Blood Sugar",
      description: "Blood sugar support supplement",
      fullDescription:
        "NuviaLab Sugar Control helps stabilize blood sugar levels naturally. Designed to help maintain healthy blood sugar levels, reduce sugar cravings, and promote overall well-being.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792733/NuviaLab_Sugar_Control_cvj4sv.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405654/NuviaLab_Sugar_Control_ei53bz.png",
      rating: 4.6,
      highlights: [
        "Stabilize blood sugar levels",
        "Improve your mood",
        "Lose weight more easily",
        "Reduce cravings for sweets",
        "Boost immunity",
      ],
      benefits: [
        "Regulates blood sugar",
        "Reduces sugar cravings",
        "Supports weight management",
        "Improves metabolism",
      ],
      ingredients: [
        {
          name: "GS4 PLUS®",
          description:
            "Gurmar leaf extract standardized to 25% gymnemic acid; reduces sugar absorption",
        },
        {
          name: "Chromium",
          description: "Helps maintain normal blood sugar levels",
        },
        {
          name: "Cinnamon Extract",
          description: "Supports glucose metabolism and insulin sensitivity",
        },
      ],
    },
    {
      id: 48,
      name: "Dentolan",
      price: "$42.99",
      category: "Fresh Breath",
      description: "Oral health supplement",
      fullDescription:
        "Dentolan provides fresh breath and greater self-confidence! Contains natural ingredients that combat the root cause of bad breath and support digestive comfort.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792727/Dentolan_bzwmdo.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405623/Dentolan_zvpbeg.png",
      rating: 4.5,
      highlights: [
        "No. 1 choice for people with bad breath",
        "Supports digestion and intestinal comfort",
        "Maintains proper gastric pH balance",
        "Supports digestive tract function",
      ],
      benefits: [
        "Eliminates bad breath",
        "Improves digestion",
        "Balances stomach acidity",
        "Promotes oral freshness",
      ],
      ingredients: [
        {
          name: "DigeZyme®",
          description:
            "A digestive enzyme complex that supports digestion and reduces toxins",
        },
        {
          name: "LactoSpore® MTCC 5856",
          description: "A probiotic culture that normalizes intestinal flora",
        },
        {
          name: "Peppermint Leaf Extract",
          description:
            "Relieves indigestion and provides antibacterial properties",
        },
        {
          name: "Artichoke Leaf Extract [2.5% Cynarin]",
          description: "Supports liver health and bile flow",
        },
        {
          name: "Fennel Fruit Extract",
          description: "Soothes gastrointestinal discomfort and aids digestion",
        },
        {
          name: "Fenugreek Seed Extract [25% Saponins]",
          description: "Improves digestion and nutrient absorption",
        },
        {
          name: "Bromelain (from Pineapple Extract)",
          description: "Aids protein digestion and reduces inflammation",
        },
        {
          name: "Papain (from Papaya Extract)",
          description: "Improves macronutrient digestion",
        },
      ],
    },
    {
      id: 49,
      name: "Lipid Control Plus",
      price: "$53.99",
      category: "Cholesterol",
      description: "Cholesterol support supplement",
      fullDescription:
        "Lipid Control Plus helps you take control of your cholesterol! Multi-ingredient food supplement designed to support healthy cholesterol levels, liver health, and cardiovascular function.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792727/Lipid_Control_Plus_tx5rm1.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405628/Lipid_Control_Plus_xdwr8v.png",
      rating: 4.7,
      highlights: [
        "Helps maintain normal cholesterol levels",
        "Supports liver function",
        "Supports heart health",
        "Prevents fat accumulation",
        "100% natural ingredients",
      ],
      benefits: [
        "Supports proper heart function",
        "Improves lipid profile",
        "Enhances liver health and detox",
        "Boosts energy and vitality",
      ],
      ingredients: [
        {
          name: "Oli-Ola™",
          description:
            "Certified European olive fruit extract with strong antioxidant action",
        },
        {
          name: "Hepure™",
          description:
            "A blend of clove flower and Italian strawflower extracts that promote liver detoxification",
        },
        {
          name: "Curcumin C3 Complex®",
          description: "Turmeric extract standardized to 85% curcuminoids",
        },
        {
          name: "Artichoke Leaf Extract",
          description: "Supports liver and digestive health",
        },
        {
          name: "Garlic Bulb Extract",
          description: "Supports circulatory and immune system function",
        },
        {
          name: "BioPerine®",
          description: "Enhances nutrient absorption and metabolism",
        },
        {
          name: "L-Ornithine L-Aspartate",
          description: "Supports liver regeneration and detoxification",
        },
        {
          name: "Choline",
          description: "Helps regulate lipid metabolism",
        },
      ],
    },
    {
      id: 50,
      name: "NuviaLab Meno",
      price: "$59.99",
      category: "Menopause",
      description: "Menopause support supplement",
      fullDescription:
        "NuviaLab Meno helps you forget about menopause and enjoy life! Multi-ingredient food supplement designed to support women during menopause.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792732/NuviaLab_Meno_hdmdul.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405654/NuviaLab_Meno_t8sq87.png",
      rating: 4.8,
      highlights: [
        "Reduces hot flashes and irritability",
        "Eliminates difficulties in falling asleep",
        "Counters fatigue and tiredness",
        "Supports hormonal regulation",
        "Natural support during menopause",
      ],
      benefits: [
        "Reduces menopause symptoms",
        "Improves sleep quality",
        "Stabilizes mood",
        "Supports hormonal balance",
      ],
      ingredients: [
        {
          name: "Libifem®",
          description:
            "Fenugreek seed extract containing 50% saponins; reduces hot flashes and night sweats",
        },
        {
          name: "Luprenol®",
          description:
            "High-quality hops cone extract; acts as a natural phytoestrogen",
        },
        {
          name: "Red Clover Leaf and Flower Extract [8% Isoflavones]",
          description: "Reduces hot flashes and excessive sweating",
        },
        {
          name: "Alfalfa Herb Extract",
          description: "Supports blood sugar regulation and increases vitality",
        },
        {
          name: "Rhubarb Root Extract [1.5% Rhein]",
          description: "Improves mood and supports bone health",
        },
        {
          name: "Vitamin D - Vita-algae D®",
          description:
            "Protects against degenerative changes and prevents osteoporosis",
        },
        {
          name: "Vitamin E",
          description: "Supports memory, concentration, and libido",
        },
        {
          name: "Vitamin B6",
          description: "Maintains normal hormonal activity",
        },
        {
          name: "Folic Acid – Advifolate®",
          description: "Reduces fatigue and supports psychological functions",
        },
      ],
    },
    {
      id: 51,
      name: "Bravona Forte",
      price: "$61.99",
      category: "Breast Enhancement",
      description: "Breast enhancement supplement",
      fullDescription:
        "Bravona Forte helps you achieve bigger and more beautiful breasts! Dual-product set (cream and food supplement) designed to naturally enhance breast size, firmness, and appearance.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792725/Bravona_Forte_h64lwg.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405622/Bravona_Forte_kzjjqz.png",
      rating: 4.5,
      highlights: [
        "Contains cream and food supplement for synergistic action",
        "Rich in phytoestrogens to naturally enhance breast size",
        "Supports hormonal activity",
        "Improves firmness and elasticity of the bust",
        "Alternative to expensive plastic surgery",
      ],
      benefits: [
        "Nourishes breasts from inside and outside",
        "First visible effects in 2 weeks",
        "Bigger, firmer, and lifted bust within months",
        "Improves skin tension and elasticity",
      ],
      ingredients: [
        {
          name: "Microencapsulated Evening Primrose Oil Powder",
          description: "Supports hormonal balance and breast tissue health",
        },
        {
          name: "Red Clover Leaf and Flower Extract [8% Isoflavones]",
          description:
            "Phytoestrogens mimic hormones, enhancing breast size and firmness",
        },
        {
          name: "Fenugreek Seed Extract [25% Saponins]",
          description:
            "Rich in saponins and isoflavones; supports estrogenic effects",
        },
        {
          name: "Dong Quai Root Extract",
          description: "Regulates hormones and supports breast appearance",
        },
        {
          name: "Hop Cones Extract",
          description: "Influences breast size and hormonal balance",
        },
        {
          name: "Vitamin E",
          description: "Smoothes and firms skin",
        },
        {
          name: "Pantothenic Acid",
          description: "Supports skin and tissue regeneration",
        },
        {
          name: "Vitamin B6",
          description: "Supports hormonal regulation",
        },
      ],
    },
    {
      id: 52,
      name: "NuviaLab Immune",
      price: "$48.99",
      category: "Immunity",
      description: "Immune system support supplement",
      fullDescription:
        "NuviaLab Immune provides comprehensive support for your body! Multi-ingredient food supplement designed to support immune system function, reduce fatigue, protect cells, and speed recovery.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792732/NuviaLab_Immune_qartlk.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405653/NuviaLab_Immune_gkabfi.png",
      rating: 4.7,
      highlights: [
        "Supports immune system function",
        "Soothes irritation of the upper respiratory tract",
        "Protects cells from oxidative stress",
        "Reduces fatigue and tiredness",
        "Contributes to faster wound healing",
      ],
      benefits: [
        "Strengthens natural immune shield",
        "Helps fight infections",
        "Speeds up recovery",
        "Boosts energy",
      ],
      ingredients: [
        {
          name: "Immunell™ (Yeast Extract)",
          description:
            "Stimulates defence mechanisms and strengthens intestinal barrier",
        },
        {
          name: "Elderberry Fruit Extract",
          description: "Shows antiviral effects and strengthens immunity",
        },
        {
          name: "Wild Rosehip Extract",
          description: "Protects cells against oxidative stress",
        },
        {
          name: "Japanese Pagoda Tree Flower Extract",
          description: "Supports immunity and has antiviral effect",
        },
        {
          name: "Rutin",
          description: "Anti-inflammatory and increases immunity",
        },
        {
          name: "Vita-algae D® (Vitamin D)",
          description: "Supports immune system and calcium absorption",
        },
        {
          name: "Zinc",
          description: "Accelerates wound healing and boosts immunity",
        },
      ],
    },
    {
      id: 53,
      name: "Brain Actives",
      price: "$57.99",
      category: "Nootropics",
      description: "Cognitive enhancement supplement",
      fullDescription:
        "Brain Actives makes your brain work as never before! Multi-ingredient food supplement designed to improve memory, concentration, learning ability, reduce fatigue, and enhance cognitive performance.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792728/Brain_Actives_yajche.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405622/Brain_Actives_yawfeb.png",
      rating: 4.8,
      highlights: [
        "Supports learning ability",
        "Improves memory and concentration",
        "Reduces reaction time",
        "Lessens feelings of fatigue",
        "Increases energy and motivation",
      ],
      benefits: [
        "Gain focus and stay on task",
        "Stay awake and alert",
        "Fight fatigue effectively",
        "Learn faster and enhance memory",
      ],
      ingredients: [
        {
          name: "KUCHACORE®",
          description:
            "High-quality extract from Kucha tea leaves; stimulates energy without side effects",
        },
        {
          name: "Rhodiolife®",
          description:
            "Supports memory and concentration, enhances information processing",
        },
      ],
    },
    {
      id: 54,
      name: "Collagen Select",
      price: "$52.99",
      category: "Anti-Aging",
      description: "Collagen drink supplement",
      fullDescription:
        "Collagen Select is the best collagen on the market! Tropical flavoured collagen drink with patented VERISOL® collagen peptides, designed to reduce wrinkles and improve skin elasticity.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792726/Collagen_Select_txkjds.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405622/Collagen_Select_a3mfws.png",
      rating: 4.6,
      highlights: [
        "Visibly reduces wrinkles",
        "Increases skin elasticity",
        "Helps maintain youthful appearance",
        "Firms skin and improves natural beauty",
        "Supports hair and nail health",
      ],
      benefits: [
        "Eliminates wrinkles",
        "Increases skin elasticity and moisture",
        "Improves natural beauty",
        "Strengthens hair and nails",
      ],
      ingredients: [
        {
          name: "DracoBelle™ Nu",
          description:
            "Moldovan Dragonhead herb extract; improves skin hydration and elasticity",
        },
        {
          name: "Verisol® hydrolysed collagen",
          description:
            "Bioactive Collagen Peptides® that improve collagen production and reduce wrinkles",
        },
        {
          name: "Biotin",
          description: "Supports healthy hair and nails",
        },
        {
          name: "Vitamin A",
          description: "Supports skin health",
        },
        {
          name: "Vitamin C",
          description: "Supports collagen production",
        },
        {
          name: "Niacin",
          description: "Supports skin health and metabolism",
        },
        {
          name: "Zinc",
          description: "Supports skin, hair, and nail health",
        },
        {
          name: "Copper",
          description: "Supports collagen production",
        },
        {
          name: "Riboflavin",
          description: "Supports cellular energy production",
        },
      ],
    },
    {
      id: 55,
      name: "Varicorin",
      price: "$54.99",
      category: "Varicose Veins",
      description: "Vein health supplement",
      fullDescription:
        "Varicorin promotes beautiful legs, beautiful you! Natural supplement designed to support vein health, reduce swelling, alleviate the feeling of heavy legs, and improve circulation.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792736/Varicorin_zzxmir.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405674/Varicorin_vcp8u3.png",
      rating: 4.5,
      highlights: [
        "Effectively fights varicose veins",
        "Reduces the feeling of heavy legs",
        "Reduces swelling and supports circulation",
        "Increases excretion of excess water",
        "Supports the health of blood vessel walls",
      ],
      benefits: [
        "Improves vein health",
        "Reduces swelling",
        "Enhances circulation",
        "Supports blood vessel walls",
      ],
      ingredients: [
        {
          name: "Venocin®",
          description:
            "High-quality standardized chestnut seed extract with at least 20% escin",
        },
        {
          name: "Centellin®",
          description:
            "Natural Asian pennywort extract standardized to 8% triterpenes",
        },
        {
          name: "Vitamin C",
          description: "From buckwheat extract; supports collagen production",
        },
        {
          name: "Hesperidin",
          description: "Improves vein health and circulation",
        },
        {
          name: "Common Grape Vine (Vitis vinifera)",
          description:
            "Powerful antioxidant that supports circulatory system health",
        },
        {
          name: "Witch Hazel",
          description:
            "Supports proper blood circulation and maintains healthy blood vessel walls",
        },
      ],
    },
    {
      id: 56,
      name: "Thyrolin",
      price: "$56.99",
      category: "Thyroid",
      description: "Thyroid support supplement",
      fullDescription:
        "Thyrolin is best for thyroid health! Natural supplement designed to support proper thyroid function, hormone production, reduce fatigue, and aid weight management.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792735/Thyrolin_iv3duc.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405674/Thyrolin_pvdkh0.png",
      rating: 4.7,
      highlights: [
        "Supports proper thyroid function",
        "Supports proper production of thyroid hormones",
        "Effectively reduces fatigue and weariness",
        "Facilitates weight loss and increases satiety",
        "Contributes to regulation of hormonal activity",
      ],
      benefits: [
        "Supports thyroid function",
        "Regulates metabolism",
        "Reduces fatigue",
        "Aids weight management",
      ],
      ingredients: [
        {
          name: "Bladderwrack Extract",
          description:
            "Supports thyroid hormone production and helps regulate metabolism",
        },
        {
          name: "L-Tyrosine",
          description: "Amino acid that supports thyroid hormone synthesis",
        },
        {
          name: "Iodine",
          description: "Essential mineral for thyroid hormone production",
        },
        {
          name: "Selenium",
          description: "Supports thyroid health and antioxidant defense",
        },
      ],
    },
    {
      id: 57,
      name: "Femin Plus",
      price: "$59.99",
      category: "Female Libido",
      description: "Female libido enhancement",
      fullDescription:
        "Femin Plus enhances phenomenal sex in women! Natural supplement designed to enhance female libido, improve sexual arousal, and support hormonal and circulatory health.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792730/Femin_Plus_nin1ct.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405624/Femin_Plus_awtxbx.png",
      rating: 4.6,
      highlights: [
        "Increases desire for sex",
        "Accelerates achievement of arousal",
        "Improves vaginal lubrication",
        "Enhances blood circulation and sensitivity",
        "Improves mood and energy",
      ],
      benefits: [
        "Enhances sexual desire",
        "Improves arousal",
        "Increases lubrication",
        "Boosts energy and mood",
      ],
      ingredients: [
        {
          name: "L-Arginine HCl",
          description: "Improves blood circulation and genital sensitivity",
        },
        {
          name: "Fennelols® Fenugreek Seed Extract",
          description: "Promotes sexual performance and female health",
        },
        {
          name: "Cocoa Seed Extract (Theobromine)",
          description: "Supports mood and reduces fatigue",
        },
        {
          name: "Maca Root Extract",
          description: "Enhances fertility and increases sexual appetite",
        },
        {
          name: "Zinc",
          description: "Promotes sexual function and reduces fatigue",
        },
        {
          name: "Black Pepper Extract - BioPerine®",
          description: "Stimulates blood flow to the genitals",
        },
        {
          name: "Damiana Leaf Extract",
          description: "Improves well-being and reduces stress",
        },
        {
          name: "Ginseng Root Extract",
          description: "Natural aphrodisiac that supports sexual health",
        },
        {
          name: "Liquorice Root Extract",
          description: "Boosts vitality and energy",
        },
        {
          name: "Ginkgo Biloba Leaf Extract",
          description: "Enhances blood circulation and sexual intensity",
        },
        {
          name: "Vitamin E",
          description: "Promotes circulation and vaginal moisturisation",
        },
        {
          name: "Vitamin B6",
          description: "Supports hormonal system function",
        },
      ],
    },
    {
      id: 58,
      name: "Spirulin Plus",
      price: "$43.99",
      category: "Colon Cleansing",
      description: "Spirulina-based supplement",
      fullDescription:
        "Spirulin Plus provides top level detox for your body! Spirulina-based supplement designed to detoxify the body, restore pH balance, and increase overall vitality.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792735/Spirulin_Plus_segwjs.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405673/Spirulin_Plus_jrus9h.png",
      rating: 4.5,
      highlights: [
        "Supports deacidification and pH balance restoration",
        "Removes excess water from the body",
        "Increases overall vitality and energy",
        "Improves wellbeing and supports multiple body systems",
      ],
      benefits: [
        "Detoxifies the body",
        "Restores pH balance",
        "Boosts vitality",
        "Supports multiple systems",
      ],
      ingredients: [
        {
          name: "Spirulina",
          description:
            "A nutrient-rich superfood that supports detoxification and boosts immunity",
        },
      ],
    },
    {
      id: 59,
      name: "Fibre Select",
      price: "$41.99",
      category: "Colon Cleansing",
      description: "High-quality fiber supplement",
      fullDescription:
        "Fibre Select is the best vital fibre for cleansing the body of toxins! High-quality fiber supplement designed to cleanse the body of toxins, improve digestion, and support overall wellbeing.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792730/Fibre_Select_zvvauv.jpg",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405624/Fibre_Select_uia7pg.png",
      rating: 4.4,
      highlights: [
        "Thoroughly cleanses the body of toxins",
        "Tough on harmful products of metabolism",
        "Improves overall health and wellbeing",
        "Supports digestion and bowel regularity",
        "Helps with weight management and satiety",
        "Regulates cholesterol levels",
      ],
      benefits: [
        "Cleanses body of toxins",
        "Improves digestion",
        "Supports weight management",
        "Regulates cholesterol",
      ],
      ingredients: [
        {
          name: "Micronised Apple Fibre",
          description:
            "Obtained from apple skins; swells in the stomach to provide satiety",
        },
        {
          name: "Plantain Seed Husk",
          description: "Improves digestion and lowers blood sugar spikes",
        },
        {
          name: "Guar Gum",
          description: "Thickening agent that promotes satiety",
        },
        {
          name: "Oligofructose from Chicory Root",
          description: "Prebiotic that stimulates the digestive system",
        },
        {
          name: "Inulin from Chicory Root",
          description: "Nutrient for beneficial gut bacteria",
        },
        {
          name: "Micronized Flax Seeds Fibre",
          description:
            "Accelerates peristalsis and facilitates toxin elimination",
        },
      ],
    },
    {
      id: 60,
      name: "Snoran Plus",
      price: "$46.99",
      category: "Snoring",
      description: "Anti-snoring supplement",
      fullDescription:
        "Snoran Plus helps you start sleeping better from now on! Natural supplement designed to reduce snoring, improve breathing, and provide deep, relaxing sleep.",
      image:
        "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762792735/Snoran_Plus_hlqmgq.png",
      logo: "https://res.cloudinary.com/dbyjiqjui/image/upload/v1762405673/Snoran_Plus_bxxyke.png",
      rating: 4.6,
      highlights: [
        "Reduces snoring",
        "Improves breathing",
        "Provides deep and relaxing sleep",
        "Non-invasive method for better sleep",
      ],
      benefits: [
        "Reduces snoring",
        "Improves airway function",
        "Promotes deep sleep",
        "Natural and non-invasive",
      ],
      ingredients: [
        {
          name: "Peppermint Leaf Extract",
          description:
            "Reduces swelling of the mucosa in airways and eases breathing",
        },
        {
          name: "Lemon Balm Leaf Extract",
          description: "Soothes the throat and supports deep, relaxing sleep",
        },
        {
          name: "Eucalyptus Leaf Extract",
          description:
            "Reduces irritation in the throat and improves airway functioning",
        },
        {
          name: "Goldenseal Root Extract",
          description: "Cleanses the respiratory tract and removes obstacles",
        },
        {
          name: "Marshmallow Root Extract",
          description: "Therapeutic component that helps reduce coughing",
        },
        {
          name: "Powdered Thyme",
          description:
            "Supports the functioning of the upper respiratory tract",
        },
      ],
    },
  ];
  const product = products.find((p) => p.id === parseInt(productId));

  const tabs = ["highlights", "benefits", "ingredients"];

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Product Not Found
          </h1>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-blue-600 to-blue-900 text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Hero Section with Gradient */}
      <div className="relative bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] text-white py-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/90 hover:text-white font-medium mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 justify-center items-center space-y-8 lg:space-y-0">
          {/* LEFT - Product Image */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="relative  rounded-3xl p-8 ">
              {/* Badge */}
              <div className="absolute top-6 right-6 bg-black text-white px-4 py-2 rounded-full text-sm font-medium z-10">
                {product.category}
              </div>

              {/* Image */}
              <div className="aspect-square flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain "
                />
              </div>
            </div>
          </div>

          {/* RIGHT - Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl md:text-3xl font-medium text-black mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-black leading-relaxed mb-6">
                {product.fullDescription || product.description}
              </p>

              {/* Price & Actions */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-xl md:text-2xl font-medium  bg-black bg-clip-text text-transparent">
                  {product.price}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-900 text-white px-8 py-4 rounded-xl font-medium cursor-pointer  flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Learn More & Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl h-[1px] bg-black my-12 mx-auto"></div>

        {/* Tabs Section */}
        {/* Tab Buttons - Responsive Horizontal Scroll on Mobile */}
      <div className="overflow-x-auto scrollbar-hide mb-8 -mx-4 px-4">
        <div className="flex justify-start sm:justify-center gap-3 min-w-max sm:min-w-0">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-3 font-semibold capitalize whitespace-nowrap transition-all duration-300
                rounded-full border-2
                ${
                  activeTab === tab
                    ? "bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] text-white  shadow-lg"
                    : "bg-transparent text-black border-transparent hover:border-black/30 hover:bg-black/5"
                }
              `}
              aria-selected={activeTab === tab}
              role="tab"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px] animate-fadeIn">
        {/* Highlights Tab */}
        {activeTab === "highlights" && product.highlights && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 gap-5">
            {product.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 
                         hover:border-green-500/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <Dot className="w-7 h-7 text-black flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 leading-relaxed text-base">
                    {highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === "benefits" && product.benefits && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {product.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 
                         hover:border-green-500/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-black text-white rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-gray-800 leading-relaxed text-base">
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ingredients Tab */}
        {activeTab === "ingredients" && product.ingredients && (
          <div className="space-y-5">
            {product.ingredients.map((ingredient, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 
                         hover:border-green-500/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="text-black font-bold text-lg sm:w-12 sm:text-center">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-black mb-2">
                      {ingredient.name}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {ingredient.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

        {/* CTA Section */}
        <div className="bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] rounded-3xl p-12 text-center mt-16">
          <h2 className="text-4xl font-medium text-white mb-4">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who achieved their wellness
            goals
          </p>
          <button className="bg-white text-blue-900 px-12 py-4 rounded-xl font-medium text-lg hover:shadow-2xl hover:scale-105 transition-all">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTemplate2;

# MicroNutri - AI-Powered Gut Health Analysis

## Overview
MicroNutri is an AI-powered web application that provides personalized nutrition recommendations based on gut microbiome analysis. The system uses a Random Forest machine learning model trained on Pakistani population data to identify key bacteria that influence diabetes and metabolic health.

## Project Structure

```
micronutri/
├── datasets/                 # Training and analysis datasets
│   ├── gut_microbiota_t2d_dataset.xlsx     # Main dataset with T2D classification
│   └── training_data_microbiome_diet.xlsx  # Training data with diet correlations
├── research/                 # Research and analysis files
│   └── micronutri_analysis.py              # Python analysis script
├── screenshots/             # UI screenshots and demos
│   ├── dashboard_preview.jpg               # Dashboard interface
│   └── analysis_output.jpg                 # Sample analysis results
└── README.md               # This file
```

## Scientific Approach

### Data Source
- **Population**: Pakistani individuals
- **Classification**: Diabetic vs Healthy participants
- **Bacteria Level**: Genus-level relative abundance values

### Machine Learning Model
- **Algorithm**: Random Forest Classifier (scikit-learn)
- **Accuracy**: ~79% for T2D prediction
- **Feature Selection**: Top 10 most predictive bacteria identified

### Key Bacteria Analyzed

#### Protective Bacteria (Good)
1. **Faecalibacterium** - Produces butyrate, reduces inflammation
2. **Butyricicoccus** - Produces beneficial short-chain fatty acids
3. **Ruminococcaceae_UCG.002** - Beneficial fiber-degrading bacteria

#### Harmful Bacteria (Concerning)
1. **Prevotella_9** - Associated with increased diabetes risk
2. **Prevotella_7** - Linked to poor metabolic outcomes
3. **Alloprevotella** - Associated with insulin resistance
4. **Slackia** - Linked to increased inflammation

#### Mixed/Complex Role
1. **Senegalimassilia** - Complex metabolic relationship
2. **Dialister** - Involved in carbohydrate metabolism
3. **Libanicoccus** - Emerging research on metabolic impact

## Application Features

### Input Parameters
- Age, Gender, Weight, Height
- Health Status (Healthy/Prediabetic/T2DM)
- Abundance levels for 10 key bacteria (0.0 - 5.0 scale)

### Analysis Output
- **BMI Calculation** - Automatic BMI and category assessment
- **Bacteria Status** - Individual analysis of each bacterium
- **Personalized Recommendations** - Evidence-based dietary advice
- **Scientific References** - PubMed links for each recommendation
- **Risk Assessment** - Overall metabolic health evaluation

### Dietary Recommendations
Each recommendation is backed by scientific literature and includes:
- Specific foods to increase/decrease
- Nutritional strategy (high-protein, low-carb, fiber-rich, etc.)
- PubMed reference for evidence traceability

## Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Styled Components** - Component-based styling
- **Framer Motion** - Smooth animations
- **React Helmet** - SEO optimization

### Analysis Engine
- **JavaScript** - Client-side bacteria analysis
- **Rule-based Logic** - Threshold-based recommendations
- **Scientific Database** - Bacteria information with PubMed references

### Design
- **Glass Morphism** - Modern UI aesthetic
- **Dark Theme** - Professional medical appearance
- **Responsive Design** - Works on all devices
- **Interactive Elements** - Real-time feedback

## Usage

1. **Personal Information** - Enter age, gender, weight, height, health status
2. **Bacteria Levels** - Adjust sliders for each of the 10 bacteria (normally obtained from microbiome test)
3. **Analysis** - Click "Get My Nutrition Plan" for instant results
4. **Recommendations** - Review personalized dietary advice with scientific backing

## Scientific Validation

All recommendations are based on:
- Peer-reviewed research from PubMed
- Population-specific data (Pakistani cohort)
- Machine learning model with 79% accuracy
- Evidence-based nutritional science

## Future Enhancements

- Integration with microbiome testing services
- Meal plan generation
- Progress tracking over time
- Additional population datasets
- Mobile app version

## Access

- **Web Application**: [revolvo.tech/projects/micronutri](http://revolvo.tech/projects/micronutri)
- **Tech Showcase**: [revolvo.tech/tech-showcase](http://revolvo.tech/tech-showcase) (AI Section)

---

*This project demonstrates the practical application of machine learning in personalized healthcare, combining scientific research with modern web technology to provide actionable health insights.*
# 🤖 AI-Enabled Laptop Recommendation System

An intelligent laptop recommendation system powered by TensorFlow.js that learns from **real laptop data** (986 laptops from Flipkart) to provide accurate, personalized recommendations based on user preferences.

## ✨ Features

- **Real Dataset Integration**: Uses actual laptop data with 986 laptops from Flipkart
- **Neural Network Model**: Deep learning model with multiple hidden layers and dropout
- **CSV Data Processing**: Automatically loads and processes your Excel/CSV laptop data
- **Smart Recommendations**: AI combines predicted ratings with preference similarity
- **Rich Laptop Info**: Shows brand, processor, graphics, and detailed specifications
- **Real User Ratings**: Learns from actual user ratings and reviews
- **Performance Metrics**: CPU rankings and GPU benchmarks for accurate scoring
- **Interactive Interface**: User-friendly web interface for inputting preferences
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technology Stack

- **TensorFlow.js**: Machine learning framework for JavaScript
- **Real Data Processing**: CSV parser for handling real laptop datasets
- **Enhanced Neural Network**: Improved architecture with 128→64→32→16→1 layers
- **Smart Similarity Matching**: Combines AI predictions with preference similarity
- **HTML5/CSS3**: Modern responsive web interface
- **Vanilla JavaScript**: ES6+ with advanced data processing

## 📊 Dataset Features

Your real laptop dataset includes **986 laptops** with the following features:

### Core Specifications:
1. **Price** (Indian Rupees - converted to USD)
2. **RAM** (4GB - 32GB)
3. **Storage** (128GB - 2TB)
4. **Screen Size** (13.3" - 17.3")
5. **Weight** (1kg - 4kg)
6. **Battery Life** (4-15 hours)
7. **Performance Score** (calculated from CPU ranking & GPU benchmark)

### Additional Rich Data:
- **User Ratings** (1-5 stars from real users)
- **Brand Information** (ASUS, Lenovo, Dell, HP, MSI, etc.)
- **Processor Details** (Intel Core i3/i5/i7/i9, AMD Ryzen, etc.)
- **Graphics Cards** (RTX 3070/3080, GTX 1650, Intel Iris Xe, etc.)
- **CPU Rankings** (Performance benchmarks)
- **GPU Benchmarks** (Graphics performance scores)
- **RAM Types** (DDR4, DDR5, LPDDR4X)
- **Laptop Types** (Gaming, Business, 2-in-1, Thin & Light)

## 🔧 Model Architecture

Enhanced neural network with real data processing:

```
Input Layer (7 features) → 
Dense Layer (128 neurons, ReLU) → 
Dropout (0.3) → 
Dense Layer (64 neurons, ReLU) → 
Dropout (0.2) → 
Dense Layer (32 neurons, ReLU) → 
Dropout (0.1) → 
Dense Layer (16 neurons, ReLU) → 
Output Layer (1 neuron, Sigmoid)
```

### Advanced Features:
- **CSV Data Processing**: Automatically parses your Excel/CSV data
- **Data Validation**: Filters out invalid or incomplete entries
- **Smart Normalization**: Handles different data scales and units
- **Similarity Scoring**: Combines AI prediction with preference matching
- **Performance Calculation**: Derives scores from CPU/GPU benchmarks

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone or download the project**
2. **Navigate to the project directory**
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm start
   ```
5. **Open your browser** to `http://localhost:8080`

### Alternative: Direct Browser Opening
You can also open `index.html` directly in your browser, but you'll need to serve it from a local server due to ES6 module restrictions.

## 📖 How to Use

### Step 1: Train the Model
1. Click the **"Train AI Model"** button
2. Wait for the training process to complete (usually 30-60 seconds)
3. Monitor the training progress in the status display

### Step 2: Input Your Preferences
Fill out the form with your laptop requirements:
- **Budget**: How much you want to spend
- **RAM**: Memory requirements for multitasking
- **Storage**: How much storage space you need
- **Screen Size**: Preferred display size
- **Battery Life**: Required battery duration
- **Weight**: Portability preferences
- **Performance**: Importance of high performance

### Step 3: Get Recommendations
1. Click **"Get AI Recommendations"**
2. View the top 5 recommended laptops
3. Compare predicted vs actual ratings
4. Review detailed specifications

## 🔧 Technical Details

### Data Preprocessing
- **Normalization**: Min-max scaling for all features
- **Label Scaling**: Ratings normalized to 0-1 range
- **Tensor Management**: Proper memory cleanup to prevent leaks

### Model Training
- **Optimizer**: Adam with learning rate 0.001
- **Loss Function**: Mean Squared Error
- **Metrics**: Mean Absolute Error
- **Epochs**: 100 with early stopping potential
- **Batch Size**: 4 (suitable for small dataset)
- **Validation Split**: 20% for model validation

### Sample Dataset
The system includes 20 sample laptops with diverse configurations:
- Budget laptops ($500-$800)
- Mid-range laptops ($800-$1500)
- Premium laptops ($1500-$2200)
- Various brands and specifications

## 🎯 Model Performance

The trained model achieves:
- **Low Loss**: Typically < 0.05 after training
- **Good Accuracy**: Mean Absolute Error < 0.1
- **Fast Inference**: Real-time predictions
- **Stable Training**: Consistent convergence

## 🔮 Future Enhancements

### Planned Features:
1. **Extended Dataset**: More laptop models and brands
2. **Advanced Features**: GPU specs, display quality, build materials
3. **User Feedback**: Learning from user ratings
4. **Recommendation Explanations**: Why each laptop was recommended
5. **Price Prediction**: Predict laptop prices based on specs
6. **Comparison Tool**: Side-by-side laptop comparisons
7. **Export Options**: Save recommendations as PDF/CSV

### Technical Improvements:
1. **Model Persistence**: Save/load trained models
2. **Advanced Architectures**: CNN, RNN, or Transformer models
3. **Hyperparameter Tuning**: Automated optimization
4. **A/B Testing**: Compare different recommendation strategies
5. **Real-time Data**: Integration with laptop databases
6. **Mobile App**: Native mobile application

## 🐛 Troubleshooting

### Common Issues:

**Model Training Fails**
- Ensure you have a stable internet connection for TensorFlow.js
- Try refreshing the page and retraining
- Check browser console for detailed error messages

**Recommendations Not Accurate**
- The model is trained on a small sample dataset
- Try different preference combinations
- Consider that it's a demonstration system

**Page Doesn't Load**
- Ensure you're serving the files from a local server
- Check that all files are in the correct directory
- Verify your browser supports ES6 modules

## 📱 Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you have any questions or need help, please create an issue in the repository.

---

**Happy laptop hunting! 💻✨**

// Improved AI Laptop Recommendation System with Better Predictions
// Enhanced data processing, feature engineering, and model architecture

class ImprovedCSVParser {
    static async loadCSV(filePath) {
        try {
            const response = await fetch(filePath);
            const csvText = await response.text();
            return this.parseCSV(csvText);
        } catch (error) {
            console.error('Error loading CSV file:', error);
            throw error;
        }
    }

    static parseCSV(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        const headers = this.parseCSVLine(lines[0]).map(header => header.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            try {
                const values = this.parseCSVLine(lines[i]);
                if (values.length >= headers.length - 2) { // Allow some flexibility
                    const row = {};
                    headers.forEach((header, index) => {
                        row[header] = values[index] || '';
                    });
                    data.push(row);
                }
            } catch (error) {
                console.warn(`Error parsing line ${i}:`, error);
            }
        }

        return { headers, data };
    }

    static parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        let quoteChar = null;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if ((char === '"' || char === "'") && !inQuotes) {
                inQuotes = true;
                quoteChar = char;
            } else if (char === quoteChar && inQuotes) {
                inQuotes = false;
                quoteChar = null;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    }
}

class ImprovedLaptopRecommendationSystem {
    constructor() {
        this.model = null;
        this.isTraining = false;
        this.trainingHistory = [];
        this.laptopData = [];
        this.processedData = [];
        this.normalizeParams = null;
        this.featureWeights = [0.25, 0.20, 0.15, 0.10, 0.10, 0.10, 0.10]; // Feature importance weights
    }

    async loadLaptopData() {
        try {
            this.updateStatus('Loading laptop dataset...');
            const csvData = await ImprovedCSVParser.loadCSV('Laptop ranked dataset.csv');
            this.laptopData = csvData.data;
            
            this.updateStatus(`Loaded ${this.laptopData.length} laptops. Processing and cleaning data...`);
            this.processedData = this.processLaptopDataImproved();
            
            this.updateStatus(`Data processing complete! ${this.processedData.length} valid laptops ready for training.`);
            console.log('Sample processed data:', this.processedData.slice(0, 3));
            
            return this.processedData;
        } catch (error) {
            console.error('Error loading laptop data:', error);
            this.updateStatus('Error loading dataset. Using sample data.');
            this.useSampleData();
        }
    }

    processLaptopDataImproved() {
        const processed = [];
        let validCount = 0;
        
        for (const laptop of this.laptopData) {
            try {
                // Extract and validate core features
                const price = this.parsePrice(laptop['Price (in Indian Rupees)']);
                const ram = this.parseNumber(laptop['RAM (in GB)']);
                const storage = this.parseNumber(laptop['Storage']);
                const screenSize = this.parseNumber(laptop['Screen Size (in inch)']);
                const weight = this.parseNumber(laptop['Weight (in kg)']);
                const userRating = this.parseUserRating(laptop['user rating']);
                
                // Enhanced battery life estimation
                const batteryLife = this.estimateBatteryLife(laptop);
                
                // Improved performance score calculation
                const performanceScore = this.calculateImprovedPerformanceScore(laptop);
                
                // Data validation with reasonable ranges
                if (this.isValidLaptopData(price, ram, storage, screenSize, weight, userRating)) {
                    // Keep price in INR for direct comparison
                    const priceINR = price;
                    
                    processed.push({
                        name: this.cleanLaptopName(laptop['name'] || 'Unknown Laptop'),
                        features: [
                            priceINR / 100000, // Normalize INR to 0-3 range for neural network
                            ram,
                            storage,
                            screenSize,
                            batteryLife,
                            weight,
                            performanceScore
                        ],
                        rating: userRating,
                        originalData: laptop,
                        brand: this.extractBrand(laptop),
                        type: this.categorizeType(laptop),
                        confidence: this.calculateDataConfidence(laptop),
                        priceINR: priceINR // Keep original INR price for display
                    });
                    validCount++;
                }
            } catch (error) {
                console.warn('Error processing laptop:', laptop.name, error);
            }
        }
        
        console.log(`Successfully processed ${validCount} valid laptops from ${this.laptopData.length} total`);
        
        // Sort by data confidence and take top quality entries
        return processed
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, Math.min(800, processed.length)); // Use top 800 highest quality entries
    }

    // Improved data validation
    isValidLaptopData(price, ram, storage, screenSize, weight, userRating) {
        return (
            price > 10000 && price < 500000 && // Valid price range in INR
            ram >= 2 && ram <= 64 && // Valid RAM range
            storage >= 64 && storage <= 4096 && // Valid storage range
            screenSize >= 10 && screenSize <= 18 && // Valid screen size
            weight >= 0.5 && weight <= 5 && // Valid weight range
            userRating > 0 && userRating <= 5 // Valid rating range
        );
    }

    // Parse user rating more accurately
    parseUserRating(ratingStr) {
        if (!ratingStr) return 0;
        const rating = parseFloat(ratingStr.toString().replace(/[^\d.]/g, ''));
        return isNaN(rating) ? 0 : Math.min(5, Math.max(0, rating));
    }

    // Estimate battery life from laptop type and specs
    estimateBatteryLife(laptop) {
        const batteryBackup = this.parseNumber(laptop['battery_backup']);
        if (batteryBackup > 0) return batteryBackup;

        // Estimate based on laptop type and specs
        const type = laptop['Type'];
        const ram = this.parseNumber(laptop['RAM (in GB)']);
        const screenSize = this.parseNumber(laptop['Screen Size (in inch)']);
        
        let estimatedBattery = 6; // Default
        
        if (type == 1) estimatedBattery = 4; // Gaming laptops
        else if (type == 2) estimatedBattery = 8; // Thin & Light
        else if (type == 3) estimatedBattery = 7; // 2-in-1
        else estimatedBattery = 6; // Others
        
        // Adjust based on specs
        if (screenSize > 16) estimatedBattery -= 1;
        if (ram > 16) estimatedBattery -= 0.5;
        
        return Math.max(3, Math.min(12, estimatedBattery));
    }

    // Improved performance score calculation
    calculateImprovedPerformanceScore(laptop) {
        const cpuRanking = this.parseNumber(laptop['CPU_ranking']) || 400;
        const gpuBenchmark = this.parseNumber(laptop['gpu_benchmark']) || 10;
        const ram = this.parseNumber(laptop['RAM (in GB)']) || 8;
        const type = this.parseNumber(laptop['Type']) || 4;
        
        // CPU score (lower ranking is better)
        let cpuScore = Math.max(1, 10 - (cpuRanking / 80));
        
        // GPU score
        let gpuScore = Math.min(10, gpuBenchmark / 15);
        
        // RAM score
        let ramScore = Math.min(10, ram / 4);
        
        // Type bonus
        let typeBonus = 1;
        if (type == 1) typeBonus = 1.3; // Gaming
        else if (type == 2) typeBonus = 0.9; // Thin & Light
        else if (type == 3) typeBonus = 1.1; // 2-in-1
        
        const finalScore = ((cpuScore * 0.4) + (gpuScore * 0.4) + (ramScore * 0.2)) * typeBonus;
        return Math.max(1, Math.min(10, finalScore));
    }

    // Calculate data confidence score
    calculateDataConfidence(laptop) {
        let confidence = 0;
        
        // Check completeness of data
        if (laptop['user rating']) confidence += 0.2;
        if (laptop['Price (in Indian Rupees)']) confidence += 0.2;
        if (laptop['CPU_ranking']) confidence += 0.2;
        if (laptop['gpu_benchmark']) confidence += 0.2;
        if (laptop['battery_backup']) confidence += 0.1;
        if (laptop['company']) confidence += 0.1;
        
        return confidence;
    }

    // Clean laptop names
    cleanLaptopName(name) {
        return name
            .replace(/"/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 100); // Limit length
    }

    // Extract brand
    extractBrand(laptop) {
        const company = laptop['company'];
        if (company && typeof company === 'string') {
            return company.trim();
        }
        
        const name = laptop['name'] || '';
        const brands = ['asus', 'lenovo', 'dell', 'hp', 'acer', 'msi', 'apple', 'microsoft', 'samsung', 'lg'];
        
        for (const brand of brands) {
            if (name.toLowerCase().includes(brand)) {
                return brand.charAt(0).toUpperCase() + brand.slice(1);
            }
        }
        
        return 'Unknown';
    }

    // Categorize laptop type
    categorizeType(laptop) {
        const type = this.parseNumber(laptop['Type']);
        const typeMap = {
            1: 'Gaming',
            2: 'Thin & Light',
            3: '2-in-1',
            4: 'Standard'
        };
        return typeMap[type] || 'Standard';
    }

    // Enhanced data normalization
    normalizeDataImproved(data) {
        const features = data.map(item => item.features);
        const labels = data.map(item => [item.rating / 5]); // Normalize to 0-1

        const featureTensor = tf.tensor2d(features);
        const labelTensor = tf.tensor2d(labels);

        // Use more robust normalization
        const featureMean = featureTensor.mean(0);
        const featureStd = featureTensor.sub(featureMean).square().mean(0).sqrt().add(tf.scalar(1e-7));
        const normalizedFeatures = featureTensor.sub(featureMean).div(featureStd);

        return {
            features: normalizedFeatures,
            labels: labelTensor,
            featureMean,
            featureStd
        };
    }

    // Improved model architecture
    createImprovedModel() {
        const model = tf.sequential({
            layers: [
                tf.layers.dense({
                    inputShape: [7],
                    units: 256,
                    activation: 'relu',
                    kernelInitializer: 'heNormal',
                    kernelRegularizer: tf.regularizers.l2({ l2: 0.001 })
                }),
                tf.layers.batchNormalization(),
                tf.layers.dropout({ rate: 0.3 }),
                
                tf.layers.dense({
                    units: 128,
                    activation: 'relu',
                    kernelRegularizer: tf.regularizers.l2({ l2: 0.001 })
                }),
                tf.layers.batchNormalization(),
                tf.layers.dropout({ rate: 0.25 }),
                
                tf.layers.dense({
                    units: 64,
                    activation: 'relu',
                    kernelRegularizer: tf.regularizers.l2({ l2: 0.001 })
                }),
                tf.layers.dropout({ rate: 0.2 }),
                
                tf.layers.dense({
                    units: 32,
                    activation: 'relu'
                }),
                tf.layers.dropout({ rate: 0.1 }),
                
                tf.layers.dense({
                    units: 1,
                    activation: 'sigmoid'
                })
            ]
        });

        // Use adaptive learning rate
        const optimizer = tf.train.adam(0.001);
        
        model.compile({
            optimizer: optimizer,
            loss: 'meanSquaredError',
            metrics: ['mae', 'mse']
        });

        return model;
    }

    // Enhanced training with better hyperparameters
    async trainModelImproved() {
        if (this.isTraining) {
            console.log('Model is already training...');
            return;
        }

        try {
            this.isTraining = true;

            if (this.processedData.length === 0) {
                await this.loadLaptopData();
            }

            this.updateStatus('Training improved AI model...');

            // Use high-quality data for training
            const trainingData = this.processedData.slice(0, Math.min(600, this.processedData.length));
            console.log(`Training with ${trainingData.length} high-quality laptops`);

            // Enhanced normalization
            const normalizedData = this.normalizeDataImproved(trainingData);
            this.normalizeParams = {
                featureMean: normalizedData.featureMean,
                featureStd: normalizedData.featureStd
            };

            // Create improved model
            this.model = this.createImprovedModel();

            // Enhanced training with callbacks
            const history = await this.model.fit(normalizedData.features, normalizedData.labels, {
                epochs: 200,
                batchSize: 32,
                validationSplit: 0.2,
                shuffle: true,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        if (epoch % 25 === 0) {
                            console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}, val_loss = ${logs.val_loss.toFixed(4)}`);
                            this.updateStatus(`Training... Epoch ${epoch}/200 - Loss: ${logs.loss.toFixed(4)} - Val Loss: ${logs.val_loss.toFixed(4)}`);
                        }
                    }
                }
            });

            this.trainingHistory = history.history;
            this.updateStatus(`Enhanced model training completed! Final validation loss: ${history.history.val_loss[history.history.val_loss.length - 1].toFixed(4)}`);

            // Clean up tensors
            normalizedData.features.dispose();
            normalizedData.labels.dispose();

        } catch (error) {
            console.error('Error training model:', error);
            this.updateStatus('Error training model: ' + error.message);
        } finally {
            this.isTraining = false;
        }
    }

    // Improved recommendation algorithm
    async getImprovedRecommendations(userPreferences) {
        if (!this.model) {
            throw new Error('Model not trained yet. Please train the model first.');
        }

        try {
            this.updateStatus('Generating smart recommendations...');

            // Convert user preferences - keep price in INR
            const userFeatures = [
                userPreferences[0] / 100000, // Normalize INR price same as training data
                userPreferences[1], // RAM
                userPreferences[2], // storage
                userPreferences[3], // screen size
                userPreferences[4], // battery life
                userPreferences[5], // weight
                userPreferences[6]  // performance score
            ];

            const predictions = [];
            const candidateLaptops = this.processedData.slice(0, 200); // Top 200 candidates

            for (let i = 0; i < candidateLaptops.length; i++) {
                const laptop = candidateLaptops[i];
                
                // Normalize laptop features
                const normalizedFeatures = this.normalizeUserPreferences(laptop.features);
                
                // Get AI prediction
                const prediction = this.model.predict(normalizedFeatures);
                const aiScore = (await prediction.data())[0];
                
                // Calculate preference similarity with INR price
                const userPrefWithINR = [
                    userPreferences[0], // Keep original INR price for similarity calculation
                    userPreferences[1], userPreferences[2], userPreferences[3],
                    userPreferences[4], userPreferences[5], userPreferences[6]
                ];
                const laptopFeaturesWithINR = [
                    laptop.priceINR || (laptop.features[0] * 100000), // Convert back to INR if needed
                    laptop.features[1], laptop.features[2], laptop.features[3],
                    laptop.features[4], laptop.features[5], laptop.features[6]
                ];
                
                const similarity = this.calculateAdvancedSimilarity(userPrefWithINR, laptopFeaturesWithINR);
                
                // Calculate feature match score
                const featureMatch = this.calculateFeatureMatch(userPrefWithINR, laptopFeaturesWithINR);
                
                // Combined scoring with multiple factors
                const finalScore = (aiScore * 0.4) + (similarity * 0.35) + (featureMatch * 0.25);

                predictions.push({
                    index: i,
                    name: laptop.name,
                    features: laptop.features,
                    originalData: laptop.originalData,
                    brand: laptop.brand,
                    type: laptop.type,
                    aiScore: aiScore * 5, // Convert back to 5-star scale
                    actualRating: laptop.rating,
                    similarity: similarity,
                    featureMatch: featureMatch,
                    finalScore: finalScore,
                    confidence: laptop.confidence,
                    priceINR: laptop.priceINR || (laptop.features[0] * 100000)
                });

                prediction.dispose();
                normalizedFeatures.dispose();
            }

            // Advanced sorting with multiple criteria
            predictions.sort((a, b) => {
                if (Math.abs(b.finalScore - a.finalScore) < 0.05) {
                    return b.confidence - a.confidence; // Use confidence as tiebreaker
                }
                return b.finalScore - a.finalScore;
            });

            this.updateStatus('Smart recommendations ready!');
            return predictions.slice(0, 5);
        } catch (error) {
            console.error('Error getting recommendations:', error);
            throw error;
        }
    }

    // Enhanced similarity calculation
    calculateAdvancedSimilarity(userPrefs, laptopFeatures) {
        let totalScore = 0;
        
        for (let i = 0; i < userPrefs.length; i++) {
            const userVal = userPrefs[i];
            const laptopVal = laptopFeatures[i];
            const weight = this.featureWeights[i];
            
            let score = 0;
            
            if (i === 0) { // Price - special handling for INR
                const priceDiff = Math.abs(userVal - laptopVal);
                const priceRange = Math.max(userVal, laptopVal);
                score = Math.max(0, 1 - (priceDiff / priceRange));
                
                // Give bonus for laptops within budget
                if (laptopVal <= userVal) {
                    score = Math.min(1, score + 0.2);
                }
            } else {
                // For other features, calculate normalized difference
                const maxVal = Math.max(userVal, laptopVal, 1);
                const diff = Math.abs(userVal - laptopVal) / maxVal;
                score = Math.max(0, 1 - diff);
            }
            
            totalScore += score * weight;
        }
        
        return totalScore;
    }

    // Calculate feature match score
    calculateFeatureMatch(userPrefs, laptopFeatures) {
        let matches = 0;
        let total = 0;
        
        // Price match (within budget and reasonable range)
        const userBudget = userPrefs[0];
        const laptopPrice = laptopFeatures[0];
        const priceMatch = laptopPrice <= userBudget && laptopPrice >= (userBudget * 0.5);
        if (priceMatch) matches += 0.3;
        total += 0.3;
        
        // RAM match (exact or higher)
        if (laptopFeatures[1] >= userPrefs[1]) matches += 0.2;
        total += 0.2;
        
        // Storage match (exact or higher)
        if (laptopFeatures[2] >= userPrefs[2]) matches += 0.2;
        total += 0.2;
        
        // Screen size match (within 1 inch)
        if (Math.abs(laptopFeatures[3] - userPrefs[3]) <= 1) matches += 0.1;
        total += 0.1;
        
        // Battery match (within 2 hours)
        if (Math.abs(laptopFeatures[4] - userPrefs[4]) <= 2) matches += 0.1;
        total += 0.1;
        
        // Weight match (within 0.5kg)
        if (Math.abs(laptopFeatures[5] - userPrefs[5]) <= 0.5) matches += 0.05;
        total += 0.05;
        
        // Performance match (within 2 points)
        if (Math.abs(laptopFeatures[6] - userPrefs[6]) <= 2) matches += 0.05;
        total += 0.05;
        
        return total > 0 ? matches / total : 0;
    }

    // Normalize user preferences using training statistics
    normalizeUserPreferences(preferences) {
        const tensor = tf.tensor2d([preferences]);
        const normalized = tensor.sub(this.normalizeParams.featureMean)
                               .div(this.normalizeParams.featureStd);
        tensor.dispose();
        return normalized;
    }

    useSampleData() {
        // High-quality sample data for fallback - with INR prices
        const sampleData = [
            [98000, 16, 512, 14, 8, 1.8, 8.5, 4.2],
            [65000, 8, 256, 15.6, 6, 2.1, 6.5, 3.8],
            [150000, 32, 1024, 16, 6, 2.8, 9.5, 4.5],
            [50000, 8, 256, 15.6, 8, 2.2, 5.5, 3.5],
            [120000, 16, 512, 13.3, 10, 1.4, 8.8, 4.3]
        ];

        const sampleNames = [
            "Dell XPS 14 Pro", "HP Pavilion 15", "ASUS ROG Gaming", 
            "Lenovo IdeaPad", "MacBook Pro 13"
        ];

        this.processedData = sampleData.map((data, index) => ({
            name: sampleNames[index],
            features: [
                data[0] / 100000, // Normalize price same way
                data[1], data[2], data[3], data[4], data[5], data[6]
            ],
            rating: data[data.length - 1],
            brand: sampleNames[index].split(' ')[0],
            type: 'Sample',
            confidence: 1.0,
            originalData: null,
            priceINR: data[0]
        }));
    }

    updateStatus(message) {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = message;
        }
        console.log(message);
    }

    parsePrice(priceStr) {
        if (!priceStr) return 0;
        const numStr = priceStr.toString().replace(/[₹,\s]/g, '');
        return parseFloat(numStr) || 0;
    }

    parseNumber(value) {
        if (value === null || value === undefined || value === '') return 0;
        const num = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
        return isNaN(num) ? 0 : num;
    }
}

// Initialize the improved system
const improvedRecommendationSystem = new ImprovedLaptopRecommendationSystem();

// DOM event handlers
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('trainModel').addEventListener('click', async () => {
        await improvedRecommendationSystem.trainModelImproved();
        document.getElementById('getRecommendations').disabled = false;
    });

    document.getElementById('getRecommendations').addEventListener('click', async () => {
        try {
            const userPreferences = [
                parseFloat(document.getElementById('budget').value),
                parseInt(document.getElementById('ram').value),
                parseInt(document.getElementById('storage').value),
                parseFloat(document.getElementById('screenSize').value),
                parseInt(document.getElementById('batteryLife').value),
                parseFloat(document.getElementById('weight').value),
                parseInt(document.getElementById('performance').value)
            ];

            const recommendations = await improvedRecommendationSystem.getImprovedRecommendations(userPreferences);
            displayImprovedRecommendations(recommendations);
        } catch (error) {
            improvedRecommendationSystem.updateStatus('Error: ' + error.message);
        }
    });
});

// Display improved recommendations
function displayImprovedRecommendations(recommendations) {
    const resultsDiv = document.getElementById('recommendations');
    resultsDiv.innerHTML = '<h2>🎯 Smart AI Recommendations (Enhanced with INR Pricing)</h2>';

    if (recommendations.length === 0) {
        resultsDiv.innerHTML += '<p>No recommendations found.</p>';
        return;
    }

    const list = document.createElement('div');
    list.className = 'recommendation-list';

    recommendations.forEach((rec, index) => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        
        const priceINR = Math.round(rec.priceINR || (rec.features[0] * 100000));
        const ram = rec.features[1];
        const storage = rec.features[2];
        const screenSize = rec.features[3];
        const batteryLife = rec.features[4];
        const weight = rec.features[5];
        const performance = rec.features[6];

        item.innerHTML = `
            <h3>${index + 1}. ${rec.name}</h3>
            <div class="laptop-details">
                <p><strong>🤖 AI Confidence:</strong> ${(rec.finalScore * 100).toFixed(1)}%</p>
                <p><strong>⭐ AI Predicted Rating:</strong> ${rec.aiScore.toFixed(2)}/5</p>
                <p><strong>🌟 Actual User Rating:</strong> ${rec.actualRating}/5</p>
                <p><strong>🎯 Preference Match:</strong> ${(rec.similarity * 100).toFixed(1)}%</p>
                <p><strong>✅ Feature Match:</strong> ${(rec.featureMatch * 100).toFixed(1)}%</p>
                <p><strong>🏢 Brand:</strong> ${rec.brand}</p>
                <p><strong>📱 Type:</strong> ${rec.type}</p>
                <p><strong>💰 Price:</strong> ₹${priceINR.toLocaleString('en-IN')}</p>
                <p><strong>🧠 RAM:</strong> ${ram}GB</p>
                <p><strong>💾 Storage:</strong> ${storage}GB</p>
                <p><strong>📺 Screen:</strong> ${screenSize}"</p>
                <p><strong>🔋 Battery:</strong> ${batteryLife} hours</p>
                <p><strong>⚖️ Weight:</strong> ${weight}kg</p>
                <p><strong>🚀 Performance:</strong> ${performance.toFixed(1)}/10</p>
            </div>
        `;
        
        list.appendChild(item);
    });

    resultsDiv.appendChild(list);
}

export { improvedRecommendationSystem, ImprovedLaptopRecommendationSystem };

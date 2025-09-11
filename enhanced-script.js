// CSV Parser utility to load the laptop dataset
class CSVParser {
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
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            
            const values = this.parseCSVLine(lines[i]);
            if (values.length === headers.length) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index];
                });
                data.push(row);
            }
        }

        return { headers, data };
    }

    static parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
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

// Enhanced Laptop Recommendation System with real data
class EnhancedLaptopRecommendationSystem {
    constructor() {
        this.model = null;
        this.isTraining = false;
        this.trainingHistory = [];
        this.laptopData = [];
        this.processedData = [];
        this.normalizeParams = null;
    }

    // Load and process the CSV data
    async loadLaptopData() {
        try {
            this.updateStatus('Loading laptop dataset...');
            const csvData = await CSVParser.loadCSV('Laptop ranked dataset.csv');
            this.laptopData = csvData.data;
            
            this.updateStatus(`Loaded ${this.laptopData.length} laptops. Processing data...`);
            this.processedData = this.processLaptopData();
            
            this.updateStatus(`Data processing complete! Ready for training.`);
            console.log('Sample processed data:', this.processedData.slice(0, 3));
            
            return this.processedData;
        } catch (error) {
            console.error('Error loading laptop data:', error);
            this.updateStatus('Error loading dataset. Using sample data.');
            // Fallback to sample data if CSV loading fails
            this.useSampleData();
        }
    }

    // Process the raw CSV data into training format
    processLaptopData() {
        const processed = [];
        
        for (const laptop of this.laptopData) {
            try {
                // Extract and convert features
                const price = this.parsePrice(laptop['Price (in Indian Rupees)']);
                const ram = this.parseNumber(laptop['RAM (in GB)']);
                const storage = this.parseNumber(laptop['Storage']);
                const screenSize = this.parseNumber(laptop['Screen Size (in inch)']);
                const weight = this.parseNumber(laptop['Weight (in kg)']);
                const batteryLife = this.parseNumber(laptop['battery_backup']) || 6; // Default 6 hours
                const userRating = this.parseNumber(laptop['user rating']);
                
                // Calculate performance score based on CPU ranking and GPU benchmark
                const cpuRanking = this.parseNumber(laptop['CPU_ranking']) || 500;
                const gpuBenchmark = this.parseNumber(laptop['gpu_benchmark']) || 10;
                const performanceScore = this.calculatePerformanceScore(cpuRanking, gpuBenchmark);
                
                // Only include laptops with valid data
                if (price > 0 && ram > 0 && storage > 0 && screenSize > 0 && weight > 0 && userRating > 0) {
                    processed.push({
                        name: laptop['name'] || 'Unknown Laptop',
                        features: [
                            price / 80000,  // Convert INR to approximate USD and normalize
                            ram,
                            storage,
                            screenSize,
                            batteryLife,
                            weight,
                            performanceScore
                        ],
                        rating: userRating,
                        originalData: laptop
                    });
                }
            } catch (error) {
                console.warn('Error processing laptop:', laptop.name, error);
            }
        }
        
        console.log(`Processed ${processed.length} valid laptops from ${this.laptopData.length} total`);
        return processed;
    }

    // Parse price from Indian Rupees
    parsePrice(priceStr) {
        if (!priceStr) return 0;
        const numStr = priceStr.toString().replace(/[₹,\s]/g, '');
        return parseFloat(numStr) || 0;
    }

    // Parse numeric values safely
    parseNumber(value) {
        if (value === null || value === undefined || value === '') return 0;
        const num = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
        return isNaN(num) ? 0 : num;
    }

    // Calculate performance score from CPU ranking and GPU benchmark
    calculatePerformanceScore(cpuRanking, gpuBenchmark) {
        // Lower CPU ranking is better, higher GPU benchmark is better
        const cpuScore = Math.max(1, 10 - (cpuRanking / 100)); // Scale CPU ranking to 1-10
        const gpuScore = Math.min(10, gpuBenchmark / 20); // Scale GPU benchmark to 0-10
        
        const avgScore = (cpuScore + gpuScore) / 2;
        return Math.max(1, Math.min(10, avgScore)); // Ensure score is between 1-10
    }

    // Fallback to sample data if CSV loading fails
    useSampleData() {
        // Original sample data from the previous version
        const sampleData = [
            [800, 8, 256, 15.6, 8, 2.1, 7, 8.5],
            [1200, 16, 512, 14, 10, 1.8, 8, 9.0],
            [600, 4, 128, 15.6, 6, 2.5, 5, 6.5],
            [1500, 16, 1024, 13.3, 12, 1.2, 9, 9.5],
            [900, 8, 512, 15.6, 9, 2.0, 7, 8.0],
            [2000, 32, 1024, 16, 8, 2.8, 10, 9.8],
            [700, 8, 256, 14, 7, 2.2, 6, 7.5],
            [1100, 12, 512, 15.6, 10, 1.9, 8, 8.5],
            [500, 4, 128, 15.6, 5, 2.6, 4, 5.5],
            [1800, 16, 512, 13.3, 11, 1.4, 9, 9.2]
        ];

        const sampleNames = [
            "Budget Pro 15", "Elite Book 14", "Basic Laptop 15", "Premium Ultra 13",
            "Mid-Range 15", "Gaming Beast 16", "Office Lite 14", "Performance Plus 15",
            "Entry Level 15", "Professional 13"
        ];

        this.processedData = sampleData.map((data, index) => ({
            name: sampleNames[index],
            features: data.slice(0, -1),
            rating: data[data.length - 1],
            originalData: null
        }));
    }

    // Normalize data for training
    normalizeData(data) {
        const features = data.map(item => item.features);
        const labels = data.map(item => [item.rating]);

        const featureTensor = tf.tensor2d(features);
        const labelTensor = tf.tensor2d(labels);

        const featureMin = featureTensor.min(0);
        const featureMax = featureTensor.max(0);
        const normalizedFeatures = featureTensor.sub(featureMin).div(featureMax.sub(featureMin));

        const labelMin = labelTensor.min();
        const labelMax = labelTensor.max();
        const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

        return {
            features: normalizedFeatures,
            labels: normalizedLabels,
            featureMin,
            featureMax,
            labelMin,
            labelMax
        };
    }

    // Create the neural network model
    createModel() {
        const model = tf.sequential({
            layers: [
                tf.layers.dense({
                    inputShape: [7],
                    units: 128,
                    activation: 'relu'
                }),
                tf.layers.dropout({ rate: 0.3 }),
                tf.layers.dense({
                    units: 64,
                    activation: 'relu'
                }),
                tf.layers.dropout({ rate: 0.2 }),
                tf.layers.dense({
                    units: 32,
                    activation: 'relu'
                }),
                tf.layers.dropout({ rate: 0.1 }),
                tf.layers.dense({
                    units: 16,
                    activation: 'relu'
                }),
                tf.layers.dense({
                    units: 1,
                    activation: 'sigmoid'
                })
            ]
        });

        model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'meanSquaredError',
            metrics: ['mae']
        });

        return model;
    }

    // Train the model with the loaded data
    async trainModel() {
        if (this.isTraining) {
            console.log('Model is already training...');
            return;
        }

        try {
            this.isTraining = true;

            // Load data if not already loaded
            if (this.processedData.length === 0) {
                await this.loadLaptopData();
            }

            this.updateStatus('Training AI model...');

            // Use a subset of data for faster training if dataset is very large
            const trainingData = this.processedData.length > 500 ? 
                this.processedData.slice(0, 500) : this.processedData;

            // Normalize data
            const normalizedData = this.normalizeData(trainingData);
            this.normalizeParams = {
                featureMin: normalizedData.featureMin,
                featureMax: normalizedData.featureMax,
                labelMin: normalizedData.labelMin,
                labelMax: normalizedData.labelMax
            };

            // Create model
            this.model = this.createModel();

            // Train the model
            const history = await this.model.fit(normalizedData.features, normalizedData.labels, {
                epochs: 150,
                batchSize: Math.min(16, Math.floor(trainingData.length / 10)),
                validationSplit: 0.2,
                shuffle: true,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        if (epoch % 20 === 0) {
                            console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}, mae = ${logs.mae.toFixed(4)}`);
                            this.updateStatus(`Training... Epoch ${epoch}/150 - Loss: ${logs.loss.toFixed(4)}`);
                        }
                    }
                }
            });

            this.trainingHistory = history.history;
            this.updateStatus(`Model training completed! Using ${trainingData.length} laptops for training.`);
            console.log('Model training completed!');

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

    // Normalize user preferences
    normalizeUserPreferences(preferences) {
        const tensor = tf.tensor2d([preferences]);
        const normalized = tensor.sub(this.normalizeParams.featureMin)
                               .div(this.normalizeParams.featureMax.sub(this.normalizeParams.featureMin));
        tensor.dispose();
        return normalized;
    }

    // Get recommendations based on user preferences
    async getRecommendations(userPreferences) {
        if (!this.model) {
            throw new Error('Model not trained yet. Please train the model first.');
        }

        try {
            // Convert user preferences to the same format as training data
            const convertedPreferences = [
                userPreferences[0] / 80000, // Convert USD to normalized price
                userPreferences[1], // RAM
                userPreferences[2], // Storage
                userPreferences[3], // Screen size
                userPreferences[4], // Battery life
                userPreferences[5], // Weight
                userPreferences[6]  // Performance score
            ];

            // Get predictions for all laptops
            const predictions = [];
            for (let i = 0; i < Math.min(this.processedData.length, 100); i++) {
                const laptop = this.processedData[i];
                const normalizedFeatures = this.normalizeUserPreferences(laptop.features);
                
                const prediction = this.model.predict(normalizedFeatures);
                const score = await prediction.data();
                
                // Denormalize the score back to original scale
                const denormalizedScore = score[0] * (await this.normalizeParams.labelMax.data())[0] + 
                                        (await this.normalizeParams.labelMin.data())[0];

                // Calculate similarity to user preferences
                const similarity = this.calculateSimilarity(convertedPreferences, laptop.features);

                predictions.push({
                    index: i,
                    name: laptop.name,
                    features: laptop.features,
                    originalData: laptop.originalData,
                    predictedRating: denormalizedScore,
                    actualRating: laptop.rating,
                    similarity: similarity,
                    score: denormalizedScore * 0.7 + similarity * 0.3 // Weighted score
                });

                prediction.dispose();
                normalizedFeatures.dispose();
            }

            // Sort by combined score (predicted rating + similarity)
            predictions.sort((a, b) => b.score - a.score);

            return predictions.slice(0, 5); // Return top 5 recommendations
        } catch (error) {
            console.error('Error getting recommendations:', error);
            throw error;
        }
    }

    // Calculate similarity between user preferences and laptop features
    calculateSimilarity(userPrefs, laptopFeatures) {
        let similarity = 0;
        const weights = [0.3, 0.2, 0.15, 0.1, 0.1, 0.1, 0.05]; // Weight importance of each feature

        for (let i = 0; i < userPrefs.length; i++) {
            const diff = Math.abs(userPrefs[i] - laptopFeatures[i]);
            const maxVal = Math.max(userPrefs[i], laptopFeatures[i]);
            const normalizedDiff = maxVal > 0 ? diff / maxVal : 0;
            similarity += weights[i] * (1 - normalizedDiff);
        }

        return Math.max(0, Math.min(1, similarity)); // Ensure similarity is between 0 and 1
    }

    // Update status display
    updateStatus(message) {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = message;
        }
        console.log(message);
    }
}

// Initialize the enhanced recommendation system
const enhancedRecommendationSystem = new EnhancedLaptopRecommendationSystem();

// DOM event handlers
document.addEventListener('DOMContentLoaded', function() {
    // Train model button
    document.getElementById('trainModel').addEventListener('click', async () => {
        await enhancedRecommendationSystem.trainModel();
        document.getElementById('getRecommendations').disabled = false;
    });

    // Get recommendations button
    document.getElementById('getRecommendations').addEventListener('click', async () => {
        try {
            // Get user preferences from form
            const userPreferences = [
                parseFloat(document.getElementById('budget').value),
                parseInt(document.getElementById('ram').value),
                parseInt(document.getElementById('storage').value),
                parseFloat(document.getElementById('screenSize').value),
                parseInt(document.getElementById('batteryLife').value),
                parseFloat(document.getElementById('weight').value),
                parseInt(document.getElementById('performance').value)
            ];

            enhancedRecommendationSystem.updateStatus('Getting AI recommendations...');
            const recommendations = await enhancedRecommendationSystem.getRecommendations(userPreferences);
            
            displayEnhancedRecommendations(recommendations);
            enhancedRecommendationSystem.updateStatus('Recommendations ready!');
        } catch (error) {
            enhancedRecommendationSystem.updateStatus('Error: ' + error.message);
        }
    });

    // Load data button (optional, for testing)
    const loadDataBtn = document.createElement('button');
    loadDataBtn.textContent = 'Load Dataset';
    loadDataBtn.className = 'btn btn-secondary';
    loadDataBtn.style.margin = '10px';
    loadDataBtn.onclick = () => enhancedRecommendationSystem.loadLaptopData();
    
    const trainSection = document.querySelector('.form-section .button-section');
    trainSection.appendChild(loadDataBtn);
});

// Display enhanced recommendations with real laptop data
function displayEnhancedRecommendations(recommendations) {
    const resultsDiv = document.getElementById('recommendations');
    resultsDiv.innerHTML = '<h2>🎯 AI Recommendations Based on Your Dataset</h2>';

    if (recommendations.length === 0) {
        resultsDiv.innerHTML += '<p>No recommendations found.</p>';
        return;
    }

    const list = document.createElement('div');
    list.className = 'recommendation-list';

    recommendations.forEach((rec, index) => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        
        // Convert normalized features back to readable format
        const price = Math.round(rec.features[0] * 80000); // Convert back to approximate USD
        const ram = rec.features[1];
        const storage = rec.features[2];
        const screenSize = rec.features[3];
        const batteryLife = rec.features[4];
        const weight = rec.features[5];
        const performance = rec.features[6];

        // Get additional info from original data if available
        const originalData = rec.originalData;
        const company = originalData ? originalData.company : 'Unknown';
        const processorName = originalData ? originalData['Processor name'] : 'Unknown Processor';
        const gpuName = originalData ? originalData['gpu name '] : 'Integrated Graphics';
        
        item.innerHTML = `
            <h3>${index + 1}. ${rec.name}</h3>
            <div class="laptop-details">
                <p><strong>AI Confidence Score:</strong> ${rec.score.toFixed(2)}/1.0</p>
                <p><strong>Predicted Rating:</strong> ${rec.predictedRating.toFixed(2)}/5</p>
                <p><strong>Actual Rating:</strong> ${rec.actualRating}/5</p>
                <p><strong>Brand:</strong> ${company}</p>
                <p><strong>Price:</strong> ~$${price}</p>
                <p><strong>RAM:</strong> ${ram}GB</p>
                <p><strong>Storage:</strong> ${storage}GB</p>
                <p><strong>Screen Size:</strong> ${screenSize}"</p>
                <p><strong>Battery Life:</strong> ${batteryLife} hours</p>
                <p><strong>Weight:</strong> ${weight}kg</p>
                <p><strong>Performance Score:</strong> ${performance.toFixed(1)}/10</p>
                <p><strong>Processor:</strong> ${processorName}</p>
                <p><strong>Graphics:</strong> ${gpuName}</p>
            </div>
        `;
        
        list.appendChild(item);
    });

    resultsDiv.appendChild(list);
}

// Export for use in other modules
export { enhancedRecommendationSystem, EnhancedLaptopRecommendationSystem, CSVParser };

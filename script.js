// AI-Enabled Laptop Recommendation System using TensorFlow.js
import * as tf from '@tensorflow/tfjs';

// Sample laptop data with features and ratings
const laptopData = [
    // [price, RAM, storage, screen_size, battery_life, weight, performance_score, rating]
    [800, 8, 256, 15.6, 8, 2.1, 7, 8.5],
    [1200, 16, 512, 14, 10, 1.8, 8, 9.0],
    [600, 4, 128, 15.6, 6, 2.5, 5, 6.5],
    [1500, 16, 1024, 13.3, 12, 1.2, 9, 9.5],
    [900, 8, 512, 15.6, 9, 2.0, 7, 8.0],
    [2000, 32, 1024, 16, 8, 2.8, 10, 9.8],
    [700, 8, 256, 14, 7, 2.2, 6, 7.5],
    [1100, 12, 512, 15.6, 10, 1.9, 8, 8.5],
    [500, 4, 128, 15.6, 5, 2.6, 4, 5.5],
    [1800, 16, 512, 13.3, 11, 1.4, 9, 9.2],
    [850, 8, 256, 14, 8, 2.0, 7, 8.0],
    [1300, 16, 1024, 15.6, 9, 2.1, 8, 8.8],
    [650, 6, 256, 15.6, 7, 2.3, 6, 7.0],
    [1600, 16, 512, 14, 12, 1.5, 9, 9.3],
    [750, 8, 512, 15.6, 8, 2.0, 7, 7.8],
    [2200, 32, 2048, 17, 6, 3.2, 10, 9.5],
    [550, 4, 128, 14, 6, 2.4, 5, 6.0],
    [1400, 16, 1024, 13.3, 11, 1.3, 9, 9.1],
    [800, 12, 512, 15.6, 9, 1.9, 7, 8.2],
    [1000, 8, 256, 14, 10, 1.7, 8, 8.3]
];

// Laptop names corresponding to the data
const laptopNames = [
    "Budget Pro 15", "Elite Book 14", "Basic Laptop 15", "Premium Ultra 13",
    "Mid-Range 15", "Gaming Beast 16", "Office Lite 14", "Performance Plus 15",
    "Entry Level 15", "Professional 13", "Standard 14", "Power User 15",
    "Affordable 15", "Business Pro 14", "Versatile 15", "Workstation 17",
    "Starter 14", "Executive 13", "Balanced 15", "Productivity 14"
];

class LaptopRecommendationSystem {
    constructor() {
        this.model = null;
        this.isTraining = false;
        this.trainingHistory = [];
    }

    // Normalize data for better training
    normalizeData(data) {
        const features = data.map(row => row.slice(0, -1)); // All except rating
        const labels = data.map(row => [row[row.length - 1]]); // Rating only

        // Convert to tensors
        const featureTensor = tf.tensor2d(features);
        const labelTensor = tf.tensor2d(labels);

        // Normalize features (min-max normalization)
        const featureMin = featureTensor.min(0);
        const featureMax = featureTensor.max(0);
        const normalizedFeatures = featureTensor.sub(featureMin).div(featureMax.sub(featureMin));

        // Normalize labels to 0-1 range
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

    // Create and compile the neural network model
    createModel() {
        const model = tf.sequential({
            layers: [
                tf.layers.dense({
                    inputShape: [7], // 7 features: price, RAM, storage, screen_size, battery_life, weight, performance_score
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
                    activation: 'sigmoid' // Output between 0 and 1
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

    // Train the model
    async trainModel() {
        if (this.isTraining) {
            console.log('Model is already training...');
            return;
        }

        try {
            this.isTraining = true;
            this.updateStatus('Training model...');

            // Normalize data
            const normalizedData = this.normalizeData(laptopData);
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
                epochs: 100,
                batchSize: 4,
                validationSplit: 0.2,
                shuffle: true,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        if (epoch % 10 === 0) {
                            console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}, mae = ${logs.mae.toFixed(4)}`);
                            this.updateStatus(`Training... Epoch ${epoch}/100`);
                        }
                    }
                }
            });

            this.trainingHistory = history.history;
            this.updateStatus('Model training completed!');
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

    // Normalize user preferences using the same parameters as training data
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
            // Normalize user preferences
            const normalizedPrefs = this.normalizeUserPreferences(userPreferences);

            // Get predictions for all laptops
            const predictions = [];
            for (let i = 0; i < laptopData.length; i++) {
                const laptopFeatures = laptopData[i].slice(0, -1);
                const normalizedFeatures = this.normalizeUserPreferences(laptopFeatures);
                
                const prediction = this.model.predict(normalizedFeatures);
                const score = await prediction.data();
                
                // Denormalize the score back to original scale
                const denormalizedScore = score[0] * (await this.normalizeParams.labelMax.data())[0] + 
                                        (await this.normalizeParams.labelMin.data())[0];

                predictions.push({
                    index: i,
                    name: laptopNames[i],
                    features: laptopData[i],
                    predictedRating: denormalizedScore,
                    actualRating: laptopData[i][laptopData[i].length - 1]
                });

                prediction.dispose();
                normalizedFeatures.dispose();
            }

            normalizedPrefs.dispose();

            // Sort by predicted rating (descending)
            predictions.sort((a, b) => b.predictedRating - a.predictedRating);

            return predictions.slice(0, 5); // Return top 5 recommendations
        } catch (error) {
            console.error('Error getting recommendations:', error);
            throw error;
        }
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

// Initialize the recommendation system
const recommendationSystem = new LaptopRecommendationSystem();

// DOM event handlers
document.addEventListener('DOMContentLoaded', function() {
    // Train model button
    document.getElementById('trainModel').addEventListener('click', async () => {
        await recommendationSystem.trainModel();
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

            recommendationSystem.updateStatus('Getting recommendations...');
            const recommendations = await recommendationSystem.getRecommendations(userPreferences);
            
            displayRecommendations(recommendations);
            recommendationSystem.updateStatus('Recommendations ready!');
        } catch (error) {
            recommendationSystem.updateStatus('Error: ' + error.message);
        }
    });
});

// Display recommendations in the UI
function displayRecommendations(recommendations) {
    const resultsDiv = document.getElementById('recommendations');
    resultsDiv.innerHTML = '';

    if (recommendations.length === 0) {
        resultsDiv.innerHTML = '<p>No recommendations found.</p>';
        return;
    }

    const list = document.createElement('div');
    list.className = 'recommendation-list';

    recommendations.forEach((rec, index) => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        
        const [price, ram, storage, screenSize, batteryLife, weight, performance] = rec.features;
        
        item.innerHTML = `
            <h3>${index + 1}. ${rec.name}</h3>
            <div class="laptop-details">
                <p><strong>Predicted Rating:</strong> ${rec.predictedRating.toFixed(2)}/10</p>
                <p><strong>Actual Rating:</strong> ${rec.actualRating}/10</p>
                <p><strong>Price:</strong> $${price}</p>
                <p><strong>RAM:</strong> ${ram}GB</p>
                <p><strong>Storage:</strong> ${storage}GB</p>
                <p><strong>Screen Size:</strong> ${screenSize}"</p>
                <p><strong>Battery Life:</strong> ${batteryLife} hours</p>
                <p><strong>Weight:</strong> ${weight}kg</p>
                <p><strong>Performance Score:</strong> ${performance}/10</p>
            </div>
        `;
        
        list.appendChild(item);
    });

    resultsDiv.appendChild(list);
}

// Export for use in other modules
export { recommendationSystem, LaptopRecommendationSystem };
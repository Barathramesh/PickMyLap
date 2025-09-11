// Demo script to test the AI laptop recommendation system
// This script can be run in the browser console for testing

async function runDemo() {
    console.log('🤖 AI Laptop Recommendation System Demo');
    console.log('=====================================');
    
    try {
        // Create a new instance of the recommendation system
        const { LaptopRecommendationSystem } = await import('./script.js');
        const system = new LaptopRecommendationSystem();
        
        console.log('📊 Training the AI model...');
        await system.trainModel();
        console.log('✅ Model training completed!');
        
        // Test with different user preferences
        const testPreferences = [
            {
                name: "Budget Student",
                prefs: [600, 8, 256, 15.6, 8, 2.2, 6],
                description: "Budget-conscious student needs basic laptop"
            },
            {
                name: "Professional Developer",
                prefs: [1500, 16, 512, 14, 10, 1.5, 9],
                description: "Developer needs powerful, portable machine"
            },
            {
                name: "Gaming Enthusiast",
                prefs: [2000, 32, 1024, 17, 6, 3.0, 10],
                description: "Gamer wants high performance, doesn't mind weight"
            },
            {
                name: "Business Executive",
                prefs: [1200, 16, 512, 13.3, 12, 1.2, 8],
                description: "Executive needs premium, ultra-portable laptop"
            }
        ];
        
        // Get recommendations for each user type
        for (const user of testPreferences) {
            console.log(`\n👤 ${user.name}: ${user.description}`);
            console.log('💭 Preferences:', user.prefs);
            
            const recommendations = await system.getRecommendations(user.prefs);
            
            console.log('🏆 Top 3 Recommendations:');
            recommendations.slice(0, 3).forEach((rec, index) => {
                console.log(`${index + 1}. ${rec.name}`);
                console.log(`   Predicted Rating: ${rec.predictedRating.toFixed(2)}/10`);
                console.log(`   Actual Rating: ${rec.actualRating}/10`);
                console.log(`   Price: $${rec.features[0]}, RAM: ${rec.features[1]}GB`);
            });
        }
        
        console.log('\n🎉 Demo completed successfully!');
        console.log('💡 Open the web interface to try it interactively!');
        
    } catch (error) {
        console.error('❌ Demo failed:', error);
    }
}

// Run the demo if in browser environment
if (typeof window !== 'undefined') {
    console.log('🚀 Run runDemo() to test the system programmatically');
    window.runDemo = runDemo;
} else {
    // Node.js environment
    runDemo();
}

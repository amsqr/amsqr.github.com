var baez = (function(){

    var stopwords = ['i','in','and','to','are','the','but','my','they','those','them','you','a']

    function tokenize(sample){

        var tokens = []

        sample.split(' ').forEach(function(token){
            if (baez.stopwords.indexOf(token) & /^[a-zA-Z0-9]+$/.test(token)){
                tokens.push(token.toLowerCase())
            }
        })

        return tokens
    }

    function probdist(tokens,totals){
        Object.keys(tokens).forEach(function(label){
            for (token in tokens[label]){
                var prob = tokens[label][token]['c'] / totals[label]
                tokens[label][token]['p'] = prob;
            }
        });

        return tokens
    }

    function guess(sample){

        scores = {}
        Object.keys(baez.samples).forEach(function(label){
            scores[label] = 0
            tokenize(sample).forEach(function(token){
                var prob = baez.probdist[label][token] || {'p': 0}
                scores[label] = scores[label] + prob['p']
            })
        })

        return scores
    }

    function train(samples){

        baez.samples = samples

        var tokens = {}
        var totals = {}

        Object.keys(samples).forEach(function(label){
            tokens[label] = {}
            totals[label] = 0
            samples[label].forEach(function(sample){
                tokenize(sample).forEach(function(token){
                    tokens[label][token] = tokens[label][token] || {'c': 0}
                    tokens[label][token]['c'] = tokens[label][token]['c'] + 1
                    totals[label] = totals[label] + 1
                })
            })
        });

        baez.probdist = probdist(tokens,totals)

        return baez.probdist

    }

    return {
        guess : guess,
        train : train,
        stopwords : stopwords,
    }

}())

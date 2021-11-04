// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  //factory for multiple objects
  const pAequorFactory = (num, dnaArray) => {
    return {
      specimenNum: num,
      dna: dnaArray,
      // randomly selecting a base and changing the base to a different. It cannot have the same dna(base)
      mutate() {
        let randomIndex = Math.floor(Math.random() * 15);
        let newBase;
        do {
          newBase = returnRandBase();
          //if it is not the same base, then it pushes the newBase as true and loops out. 
          if (this.dna[randomIndex] !== newBase) {
            this.dna[randomIndex] = newBase;
            break;
          } 
        } while (true);
        return this.dna;
      },
      getSpecimenNum () {
        return this.specimenNum;
      },
      getDNA() {
        return this.dna;
      },
      //compares the original dna and the new passed dna
      compareDNA(obj) {
        let identical = 0;
        for (let i = 0; i < 15; i++) {
          if (this.dna[i] === obj.dna[i]) {
            identical++;
            //console.log('results:', identical);
          }
        }
       //shows the percentage of two dna strands
       let percentage = (identical/obj.dna.length * 100).toFixed(2);
       return `The two DNA strands are ${percentage}% in common.`;
      },
      willLikelySurvive() {
        let addBase = 0;
        for (let i = 0; i < 15; i++) {
          //the strands 'C' and 'G' are more likely to surive, because the bases are at least 60 % to survive
          if (this.dna[i] === 'C' || 'G') {
            addBase++;
          } 
        }
        //filters everything out over 60%
        let percentage = (addBase / this.dna.length * 100).toFixed(2);
        if (percentage >= 60) {
          return true;
        } else {
          return false;
        }
      },
      // dna's are looking out for bonding to each other, some are more matchable to each other 
      complementStrand() {
        let createComplementArray = [];
        let originalDNA = this.dna;
        for (let i = 0; i < 15; i++) {
          if (originalDNA === 'A' ) {
            createComplementArray.push('T');
          } else if (originalDNA === 'T') {
            createComplementArray.push('A');
          } else if (originalDNA === 'C') {
            createComplementArray.push('G');
          } else if (originalDNA === 'G') {
            createComplementArray.push('C');
          }
          return createComplementArray;
        }
      },
    }
  }
  // creates 30 instances of dna strands.
  const createInstances = (number) => {
    let instanceCount = 1;
    let arrayOfInstances = [];
    do { 
      let newPAquor = pAequorFactory(instanceCount, mockUpStrand());
      instanceCount++;
    } while (arrayOfInstances.length < 30);
      arrayOfInstances.push(newPAquor.willLikelySurvive());
      return arrayOfInstances;
  };
  //each array element compares with each other and looks for the most related dna instance.
  const findMostRelatedInstances = (arrayOfInstances) => {
    let closeMatch = [];
    for (let i = 0; i < arrayOfInstances.length; i++ ) {
      for (let j = 0; j < arrayOfInstances.length; j++) {
        if (i !== j ) {
          let compareMatch = arrayOfInstances[i].compareDNA(arrayOfInstances[j]);
          closeMatch.push(compareMatch);
        }
        return closeMatch;
      }
    }
  };
  
  
  
  const strand1 = pAequorFactory(3, ['A', 'T', 'C', 'G', 'A', 'C', 'C', 'T', 'A', 'G', 'A', 'G', 'T', 'A', 'C']);
  
  const strand2 = pAequorFactory(2, ['T', 'G', 'T', 'A', 'C', 'C', 'C', 'T', 'G', 'A', 'G', 'T', 'C', 'A', 'C']);
  
  //console.log(strand1.dna);
  //console.log(strand2.dna);
  console.log(strand1.compareDNA(strand2));
  
  
var _ = require('lodash');

class PairingGenome {
  constructor() {
    this.genes = [];
  }

  /* 
  Eliminates any gene that has a driver or guest
  in common with it.
  */
  eliminateGene(targetGene) {
    _.remove(this.genes, (gene) => {
      return gene.guest === targetGene.guest || gene.driver === targetGene.driver;
    });
  }
  /*
  Blend the genes of two parents by:
    1. Adding an element to child genome from this
    2. Eliminating those dirver an guest elements from the mate
    3. Eliminating those driver and guests elements from the possible elements list
    4. Repeating steps 1-3 for the mate
    5. Switching back and forth until there are no elements left in the parents
    6. Pair up and merge left over guests and drivers based on the order they appear in the array (RISKY)
  */
  mateWith(mate) {
    var possibleDrivers = _.clone(PairingGenome.geneticMaterial.possibleDrivers);
    var possibleGuests = _.clone(PairingGenome.geneticMaterial.possibleGuests);

    var child = new PairingGenome();
    var flip = true;

    while(true) {
      if(flip) {
        if(this.genes.length > 0) {
          // extract gene from a parent
          //console.log(this.genes[0]);
          var gene = _.head(this.genes);
          //åconsole.log(gene);
          // add gene to the child
          child.genes.push(gene);
          // remove genes that have same driver or guest from the other parents
          mate.eliminateGene(gene);
          // remove guest from possible guests
          _.remove(possibleGuests, (guest) => { return guest === gene.guest });
          // remove driver from possible drivers
          _.remove(possibleDrivers, (driver) => { return driver == gene.driver});
          // remove gene that has been passed onto child from parent
          this.genes.splice(0, 1);
        }
      } else {
        if(mate.genes.length > 0) {
          var gene = _.head(mate.genes);
          child.genes.push(gene);
          this.eliminateGene(gene);
          _.remove(possibleGuests, (guest) => { return guest === gene.guest });
          _.remove(possibleDrivers, (driver) => { return driver == gene.driver});
          mate.genes.splice(0, 1);
        }
      }

      flip = !flip;
      if(this.genes.length == 0 && mate.genes.length == 0) {
        break;
      }
    }
    //console.log(child);
    return child;
  }
}

module.exports = PairingGenome;
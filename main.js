//https://gist.github.com/74bd26dd414b4fae14b218919d20d458

const prompt = require('prompt-sync')({sigint: true});
const readline = require('readline');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//define class
class Field {
    constructor(field) {
      this.field = field;
      this.currentPosition = [0, 0];
    }
  
    print() {
      for (const row of this.field) {
        console.log(row.join(' '));
      }
    }
  
    move(direction) {
      // Update current position based on direction
      switch (direction) {
        case 'up':
          this.currentPosition[0]--;
          break;
        case 'down':
          this.currentPosition[0]++;
          break;
        case 'left':
          this.currentPosition[1]--;
          break;
        case 'right':
          this.currentPosition[1]++;
          break;
        default:
          console.log(`Invalid direction: ${direction}`);
          return;
      }
  
      // Check if new position is outside the field
      if (this.currentPosition[0] < 0 || this.currentPosition[0] >= this.field.length ||
          this.currentPosition[1] < 0 || this.currentPosition[1] >= this.field[0].length) {
        console.log('You have moved outside the field! Game over.');
        process.exit();
      }
  
      // Check if new position is a hole
      if (this.field[this.currentPosition[0]][this.currentPosition[1]] === 'O') {
        console.log('You have fallen into a hole! Game over.');
        process.exit();
      }
  
      // Check if new position is the hat
      if (this.field[this.currentPosition[0]][this.currentPosition[1]] === '^') {
        console.log('You have found your hat! You win!');
        process.exit();
      }
  
      // Update field to mark current position with *
      this.field[this.currentPosition[0]][this.currentPosition[1]] = '*';
    }
  }
  
  const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░']
  ]);
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const promptMove = () => {
    rl.question('Enter your move (up, down, left, right): ', (direction) => {
      myField.move(direction);
      myField.print();
      promptMove();
    });
  };
  
  console.log('Welcome to the game! Try to find your hat in the field.');
  myField.print();
  promptMove();

class Ships
{
    constructor(size,id,direction,person="human")
    {
        this.length=size;
        this.id=id;
        this.hits=0;
        this.direction=direction;
        this.sunk=false;
        this.person=person;
    }
    hit()
    {
        this.hits++;
    }
    isSunk()
    {
        if(this.length===this.hits)
        {
            this.sunk=true;
            return true;
        }
        return false;
    }
}

class GameBoard
{
    constructor()
    {
       this.game=new Map();
       this.ai_game=new Map();
       this.checked=new Set();
       this.ships_positions=new Map();
       this.vertical=[1,2,3,4,5,6,7,8,9,10];
       this.horizontal=['A','B','C','D','E','F','G','H','I','J']; 
       this.horizontal.forEach(letter =>
       {
        this.vertical.forEach(number =>
        {
            this.game.set(`${letter}${number}`,null);
            this.ai_game.set(`${letter}${number}`,null);
        }
        )
       }
       )
    }
    place_ship(ship,x,y,person)
    {
        let map=person==="human"?this.game:this.ai_game;
        if(ship.direction==="horizontal")
        {
      let x_index=this.horizontal.indexOf(x);
        let length=ship.length;
        let can_place=false;
        while(length>0)
        {
            if(this.get_coordinates(map,`${this.horizontal[x_index]}${y}`)!=="occupied" && this.horizontal[x_index]!==undefined)
            {
                length--;
                can_place=true;
                x_index++;
            }
            else{
                can_place=false;
                break;
            }
        }
        if(can_place)
        {
            length=ship.length;
            x_index=this.horizontal.indexOf(x);
            while(length>0)
            {
                 if(person!="human")
                {
                    let grid=document.querySelector(".player_grid");
                    let box=grid.querySelector(`.${this.horizontal[x_index]}${y}`);
                    box.classList.add("purple");
                }
                this.set_coordinates(map,`${this.horizontal[x_index]}${y}`,"occupied");
                this.ships_positions.set(`${map}${this.horizontal[x_index]}${y}`,ship);
                x_index++;
                length--;
            }
        }
        else{
            return null;
        }
        }
        else{
        let y_index=this.vertical.indexOf(y);
        let length=ship.length;
        let can_place=false;
        while(length>0)
        {
            if(this.get_coordinates(map,`${x}${this.vertical[y_index]}`)!=="occupied" && this.vertical[y_index]!==undefined)
            {
                length--;
                can_place=true;
                y_index++;
            }
            else{
                can_place=false;
                break;
            }
        }
        if(can_place)
        {
            length=ship.length;
            y_index=this.vertical.indexOf(y);
            while(length>0)
            {
                if(person!="human")
                {
                    let grid=document.querySelector(".player_grid");
                    let box=grid.querySelector(`.${x}${this.vertical[y_index]}`);
                    box.classList.add("purple");
                }
                this.set_coordinates(map,`${x}${this.vertical[y_index]}`,"occupied");
                this.ships_positions.set(`${map}${x}${this.vertical[y_index]}`,ship);
                y_index++;
                length--;
            }
        }
        else{
            return null;
        }
        }
  
    }
    get_coordinates(map,coord)
    {
        return map.get(coord);
    }
    set_coordinates(map,coord,set)
    {
        map.set(coord,set);
    }
    get_ship_id(map,coord)
    {
        return this.ships_positions.get(`${map}${coord}`);
    }
    recieved_attack(coord,person)
    {
        let map=person==="human"?this.game:this.ai_game;
    if(this.get_coordinates(map,coord)===null){
        this.set_coordinates(map,coord,"miss");
        return `miss`;
    }
    else if(this.get_coordinates(map,coord)==="occupied")
    {
        let map=person==="human"?this.game:this.ai_game;
        this.set_coordinates(map,coord,"hit");
        let ship=this.get_ship_id(map,coord);
        ship.hit();
        return `hit`;
    }
    return null;
    }
}

class Player
{
    constructor(person="human")
    {
        this.gameBoard=new GameBoard();
        this.total_ships=[];
        this.person=person;
        this.array=Array.from(this.gameBoard.ai_game.keys());
        console.log(this.array);
    }
    attack(coord)
    {
       if(this.gameBoard.recieved_attack(coord,this.person)==="hit")
       {
        return "hit";
       }
    }
    create_ships()
    {
        this.ship1=new Ships(4,10,"vertical",this.person);
        this.ship2=new Ships(3,11,"vertical",this.person);
        this.ship3=new Ships(3,12,"horizontal",this.person);
        this.ship4=new Ships(2,20,"horizontal",this.person);
        this.ship5=new Ships(2,21,"vertical",this.person);
        this.ship6=new Ships(2,22,"horizontal",this.person);
        this.ship7=new Ships(1,23,"horizontal",this.person);
        this.ship8=new Ships(1,24,"horizontal",this.person);
        this.ship9=new Ships(1,25,"horizontal",this.person);
        this.ship10=new Ships(1,26,"horizontal",this.person);
        this.place_ships(this.ship1);
        this.place_ships(this.ship2);
        this.place_ships(this.ship3);
        this.place_ships(this.ship4);
        this.place_ships(this.ship5);
        this.place_ships(this.ship6);
        this.place_ships(this.ship7);
        this.place_ships(this.ship8);
        this.place_ships(this.ship9);
        this.place_ships(this.ship10);

        this.total_ships=[this.ship1,this.ship2,this.ship3,this.ship4,this.ship5,this.ship6,this.ship7,this.ship8,this.ship9,this.ship10];
    }
    place_ships(ship)
    {
    let vertical=[1,2,3,4,5,6,7,8,9,10];
    let horizontal=['A','B','C','D','E','F','G','H','I','J']; 
    let randx=Math.floor(Math.random()*9);
    let randy=Math.floor(Math.random()*9);
    if(this.gameBoard.place_ship(ship,horizontal[randx],vertical[randy],this.person)===null)
    {
        this.place_ships(ship);
    }
    else{
console.log(`${horizontal[randx]}:${vertical[randy]}`);
    }
    }
    all_ships_sunk()
    {
        let ships_sunk=0;
        this.total_ships.forEach(ship =>
        {
            if(ship.isSunk())
            {
                ships_sunk++;
            }
        }
        )
        if(ships_sunk===this.total_ships.length)
        {
            return true;
        }
        return false;
    }
    get_coord()
    {
        let random=Math.floor(Math.random()*this.array.length);
        if(this.gameBoard.get_coordinates(this.gameBoard.ai_game,this.array[random])!=="hit" && this.gameBoard.get_coordinates(this.gameBoard.ai_game,this.array[random])!=="miss")
        {
            let value=this.array[random];
            let temp=this.array[random];
            this.array[random]=this.array[0];
            this.array[0]=temp;
            this.array.shift();
            return value;
        }
        else{
            this.get_coord();
        }
    }
}
export{GameBoard,Ships,Player};
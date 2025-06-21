import { Gameboard,Ships,Player } from './script';
import './style.css';
    let player1=new Player();
    let player_ai=new Player("AI");
class Game{
    constructor()
    {
        this.turn=2;
        this.vertical=[1,2,3,4,5,6,7,8,9,10];
        this.horizontal=['A','B','C','D','E','F','G','H','I','J'];
        this.reset.bind(this);
        this.start_game.bind(this); 
    }
    create_player_grid()
{
    let player_grid=document.querySelector(".player_grid");
    let computer_grid=document.querySelector(".computer_grid");
    for(let i=0;i<10;i++)
    {
        for(let j=0;j<10;j++)
        {
            let player_box=document.createElement("button");
            let computer_box=document.createElement("button");
            computer_box.classList.add(`${this.horizontal[j]}${this.vertical[i]}`);
            player_box.classList.add(`${this.horizontal[j]}${this.vertical[i]}`);
            this.add_event_listener(computer_box);
            this.add_event_listener_player_boxes(player_box);
            computer_box.disabled=true;
            player_box.disabled=true;
            player_grid.appendChild(player_box);
            computer_grid.appendChild(computer_box);
        }
    }
}
remove_grid()
{
    let player_grid=document.querySelector(".player_grid");
    let computer_grid=document.querySelector(".computer_grid");
    player_grid.innerHTML="";
    computer_grid.innerHTML="";
}
add_event_listener(element)
{
    element.addEventListener("click",()=>
    {
        let classes=element.classList;
       if(player1.attack(classes.value)==="hit")
       {
        element.classList.add("green");
        element.style="background-color:green";
        element.disabled=true;
        this.check_winner();
       }
       else{
        this.turn++;
        this.proceed_game(); 
        element.classList.add("red");
        element.style="background:red";
        element.disabled=true;
       }
    })

}
add_event_listener_player_boxes(element)
{
    element.addEventListener("click",()=>
    {
       if(element.classList.contains("purple"))
       {
        console.log("THIS IS PURPLE");
        element.classList.remove("purple");
        element.style="background-color:green";
          let classes=element.classList;
          player_ai.attack(classes.value);
        this.ai_move();
        element.disabled=true;
        this.check_winner();
       }
       else{
        this.turn++;
        this.proceed_game();
        console.log("SAD");
        element.style="background-color:red";
        element.disabled=true;
       }   
    })
}
remove_event_listener_player_boxes(element)
{
    element.disabled=true;
}
remove_Event_Listener(element)
{
   element.disabled=true;
}
ai_move()
{
  let coord = player_ai.get_coord();
  let grid = document.querySelector(".player_grid");
  let attackResult = player_ai.attack(coord);
  
  let box = grid.querySelector(`.${coord}`);
  
  if (!box) {
    console.error("Box not found for coord:", coord);
    return;
  }

  if (attackResult === "hit") {
    box.classList.add("green");
    box.style.backgroundColor = "green";
  } else {
    box.classList.add("red");
    box.style.backgroundColor = "red";
  }
  box.disabled = true;
  
  this.check_winner();
  this.turn++;
  this.proceed_game();

}
check_winner()
{
if(player1.all_ships_sunk())
    {
        let display_message=document.querySelector("h1");
            display_message.textContent="You Win!";
            this.add_replay();
    }
    else if(player_ai.all_ships_sunk())
    {
        let display_message=document.querySelector("h1");
            display_message.textContent="AI Win!";
            this.add_replay();
    }
}
add_replay()
{
    let div=document.querySelector(".play_buttons");
    let replay=document.createElement("button");
    replay.classList.add("replay");
    replay.textContent="Replay";
    if(!(document.querySelector(".replay")))
    {
div.appendChild(replay);
    }
    replay.addEventListener("click",()=>this.reset());
}
reset()
{
        let h1=document.querySelector("h1");
    h1.textContent="BattleShip";
    let replay=document.querySelector(".replay");
    replay.classList.remove("replay");
    replay.parentNode.removeChild(replay);
    replay.removeEventListener("click",()=>this.reset());
    this.start_game();
}
start_game()
{
    let play_button=document.querySelector(".play");
        play_button.removeEventListener("click",()=>
    {
        play_button.disabled=true;
    player1.create_ships();
    this.proceed_game();
    })
    this.remove_grid();
    this.create_player_grid();
    player_ai.create_ships();
       console.log(player_ai.gameBoard.ai_game);
    play_button.disabled=false;
    play_button.addEventListener("click",()=>
    {
        play_button.disabled=true;
        this.proceed_game();
    })
}
initial_start()
{
this.create_player_grid();
       player_ai.create_ships();
       console.log(player_ai.gameBoard.ai_game);
    let play_button=document.querySelector(".play");
    play_button.disabled=false;
    play_button.addEventListener("click",()=>
    {
        play_button.disabled=true;
    player1.create_ships();
    this.proceed_game();
    })
}
proceed_game()
{
     let boxes=document.querySelectorAll(".computer_grid>*");
     let player_boxes=document.querySelectorAll(".player_grid>*");
     if(this.turn%2===0)
     {
        boxes.forEach(box =>{
    if(!(box.classList.contains("red")) && !(box.classList.contains("green")))
        {box.disabled=false;}
    }
    )
    player_boxes.forEach(box =>
        {
            box.disabled=true;
        }
    )
    }
    else{
     boxes.forEach(box =>
    {
        box.disabled=true;
    }
    )
    player_boxes.forEach(box =>
        {
            box.disabled=false;
        }
    )
    this.ai_move();   
    }
    
}
}
let game=new Game();
document.addEventListener('DOMContentLoaded', () => {
       game.initial_start();
});
const btn1 = document.getElementById("add_btn");

// Select the container where the cards will be added
const container = document.querySelector('.ctnr');

// Add click event listener to the button
btn1.addEventListener("click", () => {
  btn1.className = "hidden";
  const ctnr1 = document.createElement('div');
  const card = document.createElement('div');

  ctnr1.className = "cntr1";

  card.classList.add('card');
  card.innerHTML = `
                <input type="text" name="" id="input" placeholder="Enter Board Name">
               <div class="add-del">
               <button class="add-board">Add Board</button>
               <button class="delete">X</button>
               </div>
  `;
  ctnr1.append(card)
  container.append(ctnr1);

  const container2 = document.getElementsByClassName('.ctnr2');

    card.addEventListener("click", (e)=>{
        if(e.target.innerText === "Add Board"){
            console.log("hello")

            const ctnr2 = document.createElement("div");
            const card2 = document.createElement('div');

            ctnr2.className = "ctnr2";

            card.className = "card2";

            btn1.style.display = "block";
            card.style.display = "none";
            card2.style.display = "block";
           
            const boardInput = document.getElementById("input")
            let title = boardInput.value
               
                card2.innerHTML = `
                  <div class="really">
                    <div class="title">
                      <div>${title}</div>
                      <img src="./photo-1486406146926-c627a92ad1ab.avif" alt="" height="20px" width="10px">
                    </div>
                    <div class="addCard">
                      <button class="add-card btn3"> + Add Card</button>
                    </div>
                  </div>
                `;
                container.append(card2);
            // ctnr2.append(card2)
            // container2.append(ctnr2);
            
        }
        else if (e.target.innerText === "X") {
            card.style.display ="none";
        }

        const btn3 = document.querySelector("btn3");

        btn3.addEventListener("click", () => {
            const cardUd = document.createElement("div");
            cardUd.style.display = "block";
            card2.style.display = "none";
            cardUd.className = "cardss";

            cardUd.innerHTML =`
            <input type="text" name="" id="input" placeholder="Enter Board Name">
            <div class="add-del">
            <button class="add-board">Add Board</button>
            <button class="delete">X</button>
            </div>

            `
        })
        



          
    });


  
});


// const card = document.querySelector(".card");











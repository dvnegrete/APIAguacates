const baseUrl =  "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");

const formatPrice = (price) => {
    const newPrice = new Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD"
    }).format(price);
    
    return newPrice;
};

window
    .fetch(`${baseUrl}/api/avo`)    
    .then((respuesta) => respuesta.json())
    //JSON -> DATA -> Renderizar info browser
    .then((responseJSON) => {
        const todosLosItems = [];
        responseJSON.data.forEach((element) => {            
            //crear imagen
            const imagen = document.createElement("img");
            imagen.src = `${baseUrl}${element.image}`;
            imagen.className= "rounded-circle w-50 p-2";
            
            //crear titulo
            const title = document.createElement("h2");
            title.textContent = element.name;            
            title.className = "rounded-pill bg-warning col-12";            
            
            //crear precio
            const price = document.createElement("div");
            price.textContent = "Precio: " + formatPrice(element.price);
            price.className = "text-info rounded-pill bg-white font-weight-bolder col-6 h4";
            
            //crear sabor
            const taste = document.createElement("p");
            taste.textContent = "Sabor: " + element.attributes.description;
            taste.className = "text-dark p-6";
                        
            //creando contenedores
            const containerName = document.createElement("div");
            containerName.append(title, price);
            containerName.className = "d-flex flex-column align-items-center";
            
            const containerNameImage = document.createElement("div");
            containerNameImage.append(imagen, containerName);
            // containerNameImage.className = "";
          

            const containerInfo = document.createElement("div");
            containerInfo.append(taste);
            containerInfo.className = "d-md-flex flex-column align-item-center p-6";
          

            //creando contenedor general
            const container = document.createElement("div");
            container.append(containerNameImage, containerInfo);
            container.className = "col-sm-6 p-4 d-flex flex-column align-item-center";
          
            
            //Todos al contenedor general
            todosLosItems.push(container);
        
        });

        appNode.append(...todosLosItems);       
    });
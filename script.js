document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM que usaremos
    const startButton = document.getElementById('startButton');
    const inicioDiv = document.getElementById('inicio');
    const contenidoDiv = document.getElementById('contenido');
    const music = document.getElementById('background-music');
    
    // MODIFICADO: Cambiamos 'quizForm' por el botón y los elementos de feedback
    const checkBtn = document.getElementById('checkBtn'); // Asegúrate de que tu botón del quiz tenga id="checkBtn"
    const feedbackQ1 = document.getElementById('feedback-q1'); // Y el párrafo de feedback id="feedback-q1"
    const feedbackQ2 = document.getElementById('feedback-q2'); // Y el otro, id="feedback-q2"

    const juegoSection = document.getElementById('juego');
    const propuestaSection = document.getElementById('propuesta');
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');

    // --- 1. Lógica para comenzar la experiencia (Sin cambios) ---
    startButton.addEventListener('click', () => {
        inicioDiv.classList.add('hidden');
        contenidoDiv.classList.remove('hidden');
        
        music.play().catch(error => {
            console.log("El navegador bloqueó la reproducción automática. El usuario debe interactuar para iniciarla.");
        });
    });

    // --- 2. Lógica del Juego (Quiz) - MEJORADA CON FEEDBACK INSTANTÁNEO ---
    // Reemplazamos el 'submit' por un 'click' en el botón para mejor control
    checkBtn.addEventListener('click', () => {
        // ---- ¡¡¡AQUÍ ESTÁN TUS RESPUESTAS!!! ----
        const respuestaCorrecta1 = "en tu pieza"; 
        const respuestaCorrecta2 = "carton mojado";

        const respuestaUsuario1 = document.getElementById('q1').value.trim().toLowerCase();
        const respuestaUsuario2 = document.getElementById('q2').value.trim().toLowerCase();

        let isQ1Correct = false;
        let isQ2Correct = false;

        // Revisar Pregunta 1 y mostrar feedback
        if (respuestaUsuario1 === respuestaCorrecta1) {
            feedbackQ1.textContent = '¡Correcto! ✔️';
            feedbackQ1.className = 'feedback feedback-correct';
            isQ1Correct = true;
        } else {
            feedbackQ1.textContent = 'Incorrecto, intenta de nuevo 🤔';
            feedbackQ1.className = 'feedback feedback-incorrect';
        }

        // Revisar Pregunta 2 y mostrar feedback
        if (respuestaUsuario2 === respuestaCorrecta2) {
            feedbackQ2.textContent = '¡Correcto! ✔️';
            feedbackQ2.className = 'feedback feedback-correct';
            isQ2Correct = true;
        } else {
            feedbackQ2.textContent = 'Incorrecto, intenta de nuevo 🤔';
            feedbackQ2.className = 'feedback feedback-incorrect';
        }

        // Si AMBAS son correctas, esperar un momento y mostrar la propuesta
        if (isQ1Correct && isQ2Correct) {
            setTimeout(() => {
                juegoSection.classList.add('hidden');
                propuestaSection.classList.remove('hidden');
            }, 1500); // Espera 1.5 segundos para un efecto dramático
        }
    });

    // --- 3. Lógica del botón "No" - MEJORADA CON MÁXIMA INTERACTIVIDAD ---
    const noMessages = [
        "No",
        "¿De verdad?",
        "¡Pero piénsalo!",
        "Mira el otro botón...",
        "¡Se ve más bonito el 'Sí'!",
        "¿Estás 100% segura?",
        "¡Te voy a extrañar!",
        "Ok, último intento..."
    ];
    let messageIndex = 0;
    let yesButtonScale = 1;

    noBtn.addEventListener('mouseover', () => {
        // Aumenta el tamaño del botón "Sí"
        yesButtonScale += 0.2;
        yesBtn.style.transform = `scale(${yesButtonScale})`;
        yesBtn.style.transition = 'transform 0.3s ease';

        // Cambia el texto del botón "No"
        noBtn.textContent = noMessages[messageIndex % noMessages.length];
        messageIndex++;

        // Mueve el botón "No" (solo en pantallas grandes)
        if (window.innerWidth > 680) {
            const container = document.querySelector('.botones');
            const containerRect = container.getBoundingClientRect();
            const btnRect = noBtn.getBoundingClientRect();
            let newTop = Math.random() * (containerRect.height - btnRect.height);
            let newLeft = Math.random() * (containerRect.width - btnRect.width);
            noBtn.style.position = 'absolute';
            noBtn.style.top = `${newTop}px`;
            noBtn.style.left = `${newLeft}px`;
        }
    });

    // --- 4. Lógica del botón "Sí" (Sin cambios) ---
    yesBtn.addEventListener('click', () => {
        document.body.innerHTML = `
            <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #ffdde1, #ee9ca7); text-align: center; padding: 20px;">
                <h1 style="font-family: 'Dancing Script', cursive; font-size: 3.5em; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">¡SABÍA QUE DIRÍAS QUE SÍ!</h1>
                <h2 style="font-family: 'Montserrat', sans-serif; color: white; font-weight: 600;">¡Te amo más que a nada en el universo! ❤️</h2>
            </div>
        `;
    });
});
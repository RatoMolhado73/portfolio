function tocarSom(id) {
      const som = document.getElementById(id);
      if (som) {
        som.currentTime = 0;
        som.play();
      }
    }

    
    function abrirJanela() {
      const janela = document.getElementById('janela1');
      janela.style.display = 'block';
      janela.style.top = `${100 + Math.random() * 200}px`;
      janela.style.left = `${100 + Math.random() * 300}px`;
      janela.style.zIndex = ++window.zIndexCount;
      tocarSom('sound-popup');

      const musica = document.getElementById('musica-janela');
      if (musica) {
        musica.currentTime = 0;
        musica.play();
      }
    }
    window.zIndexCount = 10;

    function fecharJanela() {
      document.getElementById('janela1').style.display = 'none';
      tocarSom('sound-error');

      const musica = document.getElementById('musica-janela');
      if (musica) {
        musica.pause();
        musica.currentTime = 0;
      }
    }



    function tornarArrastavel(janelaId, tituloId) {
      const janela = document.getElementById(janelaId);
      const barra = document.getElementById(tituloId);

      let offsetX = 0, offsetY = 0, isDragging = false;

      barra.onmousedown = function (e) {
        isDragging = true;
        offsetX = e.clientX - janela.offsetLeft;
        offsetY = e.clientY - janela.offsetTop;
        document.body.style.cursor = 'move';
      };

      document.onmouseup = function () {
        isDragging = false;
        document.body.style.cursor = 'default';
      };

      document.onmousemove = function (e) {
        if (isDragging) {
          janela.style.left = (e.clientX - offsetX) + 'px';
          janela.style.top = (e.clientY - offsetY) + 'px';
        }
      };
    }

 
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => tocarSom('sound-click'));
      });

      tornarArrastavel('janela1', 'titulo-janela1');
    });
    const btnIniciar = document.getElementById('btnIniciar');
    const menuIniciar = document.getElementById('menuIniciar');
    const somClick = document.getElementById('sound-click');

    btnIniciar.addEventListener('click', () => {
      if (menuIniciar.style.display === 'block') {
        menuIniciar.style.display = 'none';
      } else {
        menuIniciar.style.display = 'block';
       
        const rect = btnIniciar.getBoundingClientRect();
        menuIniciar.style.left = rect.left + 'px';
        menuIniciar.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
      }
      somClick.currentTime = 0;
      somClick.play();
    });


    document.addEventListener('click', (e) => {
      if (!btnIniciar.contains(e.target) && !menuIniciar.contains(e.target)) {
        menuIniciar.style.display = 'none';
      }
    });


    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        menuIniciar.style.display = 'none';
      }
    });

    const bonzi = document.getElementById('bonzi');
    const bonziImg = bonzi.querySelector('img');

    bonzi.addEventListener('click', () => {
      const frases = [
        "Olá! Eu sou seu novo assistente virtual!",
        "Você sabia que HTML significa HyperText Markup Language?",
        "Vamos navegar juntos pela internet dos anos 90!",
        "Clique em um projeto para ver algo incrível!",
        "Eu sinto falta do Clippy...",
        "No céu tem pão, e morreu"
      ];

      const frase = frases[Math.floor(Math.random() * frases.length)];

      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(frase);
      utter.voice = synth.getVoices().find(v => v.lang.startsWith('pt')) || synth.getVoices()[0];
      utter.pitch = 1.1;
      utter.rate = 1;

   
      bonziImg.src = 'img/bonzi2.gif'; 

      
      setTimeout(() => {
        bonziImg.src = 'img/bonzi1.gif';
      }, 5000);

      synth.speak(utter);
    });

    document.addEventListener('DOMContentLoaded', () => {
      const audio = document.getElementById('musica-janela');
      const playPauseBtn = document.getElementById('playPause');
      const seekBar = document.getElementById('seekBar');
      const timeLabel = document.getElementById('timeLabel');

      playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
          audio.play();
          playPauseBtn.textContent = '⏸';
        } else {
          audio.pause();
          playPauseBtn.textContent = '▶';
        }
      });

      audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        seekBar.value = progress;

        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        timeLabel.textContent = `${minutes}:${seconds}`;
      });

      seekBar.addEventListener('input', () => {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
      });
    });
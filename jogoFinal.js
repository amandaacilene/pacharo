//Variaveis de função e condição

var nivel = 1;
var pontos = 0; 
var vidas = 2; 
var tempo = 0; 
var zerou = false;

var speed1 = 2;
var speed2 = 3;
var speed3 = 4;
var speed4 = 4.5;
var speed5 = 5;
var alphaTransicao = 250;
var tempoDeInicio = Date.now();
var tg = 0;
var testvar=false;
var yExtraPt = -60;
var xExtraPt = -60;

function setup() {
  createCanvas(550, 500).parent('game-canvas');
}
var tamBloco = 30; 
var x , y; 

cenario_inicial = [ 
  ['v','v','v','v','v','v','v','v','v','v','v','v','v','v','v'], 
  ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
  ['#','v','c','m','c','c','c','#','c','c','c','c','c','m','#'],
  ['#','c','#','c','#','#','c','#','c','#','#','c','#','c','#'],
  ['#','c','#','c','#','c','c','c','c','c','#','c','#','c','#'],
  ['#','c','#','c','#','c','#','#','#','c','#','c','#','c','#'],
  ['#','c','c','c','#','c','c','c','c','c','#','c','c','c','#'],
  ['#','#','#','c','#','#','#','c','#','#','#','#','#','c','#'],
  ['#','c','c','c','#','v','v','m','v','v','#','c','c','c','#'],
  ['#','c','#','c','#','#','#','#','#','#','#','c','#','c','#'],
  ['#','c','#','c','c','c','c','m','c','c','c','c','#','c','#'],
  ['#','c','#','#','#','#','#','#','#','#','#','#','#','c','#'],
  ['#','c','#','c','c','c','c','c','c','c','c','c','#','c','#'],
  ['#','c','#','c','#','#','c','#','c','#','#','c','#','c','#'],
  ['#','m','c','c','c','c','c','#','c','c','c','c','c','c','#'],
  ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
  ['v','v','v','v','v','v','v','v','v','v','v','v','v','v','v']
]; 

function renovaCenario(){
	cenario = [];
	for (i = 0; i < cenario_inicial.length; i++){
		cenario.push(cenario_inicial[i].slice());
	}
}

renovaCenario();

//Variaveis de Desenho
var x = 35;
var y = 81;
var z = 200;
var w = -12399123;
var a = -19341232;
var b = -1239123;
var c = -12391823;

function colisao(px, py) {
  posColuna = Math.floor( px / tamBloco ); 
  posLinha = Math.floor( py / tamBloco );
	if ( cenario[posLinha][posColuna] == '#' ) {
		return true;     
	}
	else {
		return false;  
	} 
}
function pontuacao(){
	for(i=0; i<cenario.length; i++){
		for(j=0; j<cenario[0].length; j++){
			if(cenario[i][j] == 'm' && dist(j*tamBloco+(tamBloco/2), i*tamBloco+(tamBloco/2), x, y) <= tamBloco/2){
				cenario[i][j] = 'v';
				pontos+=3;
				//yExtraPt = 19;
				yExtraPt = y;
				xExtraPt = x-60;
			}
			if(cenario[i][j] == 'c' && dist(j*tamBloco+(tamBloco/2), i*tamBloco+(tamBloco/2), x, y) <= tamBloco/2){
				cenario[i][j] = 'v';
				pontos++;
				if (pontos == 109 && nivel < 6){
					pontos = 0;
					nivel++;	
					alphaTransicao = 250;
					x = 35;
					y = 81;
					renovaCenario();
					j = cenario[0].length;
					i = cenario.length;	
					if (nivel == 2){
						w = 140;
					} else if (nivel == 3){
						a = 121;
					} else if (nivel == 4){
						b = 270;
					} else if (nivel == 5){
						c = 120;
					} else if (nivel == 6 && !zerou){
						tempoFim = tempo;
						zerou = true;
					}
				} 
			}	
		}	
	}	

}	

function draw() {

  //Fundo Verde
  fill(102,	205,170);
  rect(0, 0, 450, 450);
  //Retangulo Branco de Informações
  fill(255);
  rect(0,0,450,30);

  //Etapa 6 --> Inserindo cenário
  stroke(102,	205,170);

  for ( i = 0; i < cenario.length; i++ ) { 
    for ( j = 0; j < cenario[0].length; j++ ) {  
      if ( cenario[i][j] == '#' ) {
        fill(254);
        rect(j*tamBloco,i*tamBloco,tamBloco,tamBloco); 
      }
      if ( cenario[i][j] == 'c' ) {
        fill(254);
        ellipse(j*tamBloco+(tamBloco/2),i*tamBloco+(tamBloco/2),10,10); 
      }
      if ( cenario[i][j] == 'm' ) {
        fill(255,102,102);
        ellipse(j*tamBloco+(tamBloco/2),i*tamBloco+(tamBloco/2),15,15); 
      }
    }
  }
	//Locomoção pela esqueda <--
	direcao = document.getElementById('direcao').value;

   if (keyIsDown(LEFT_ARROW) || direcao == 'esquerda') {
     if ( ! colisao( x - 6 - tamBloco/31, y ) ) {
	   if (tempo>0)
		x = x - 6;
     }
   }
   //Locomoção pela direita -->
   if ( keyIsDown(RIGHT_ARROW) || direcao == 'direita') { 
     if ( ! colisao( x + 10 + tamBloco/1.5, y )) {
	   if (tempo>0)
		x = x + 6;       
     } 
   }
   if (keyIsDown(UP_ARROW) || direcao == 'cima') {
	 if ( ! colisao( x + 6, y - 24 - tamBloco/50) ) {
		if (tempo>0)
		  y = y - 6;       
     } 
	}
   if (keyIsDown(DOWN_ARROW) || direcao == 'baixo') {
	 if ( ! colisao( x + 6, y + 6 + tamBloco/10) ) {
		if (tempo>0)
		  y = y + 6;
     } 
	} 
	//Criação do Jogador 1 - Hantaro 
	fill(0);3
	textSize(23);
  	text("🐹", x, y);
	
	//Movimento e objeto do nível 1 - coala
	textSize(23);
  	text("🐨", z, 264);
	
	if(z > 264){
        speed1 = -2;
    } 
    if(z < 149){
        speed1 = 2; 
    } 
	z+=speed1;
	
	//Colisão com Coala 
	if(dist(x,y, z, 264) < 30){
		vidas--;
		pontos = 0;
		x = 29;
		y = 81;
		renovaCenario();
		j = cenario[0].length;
		i = cenario.length;	
	}
	
	//Movimento e Objetos do nível 2 - urso
	textSize(23);
  	text("🐻", w, 324);
  	if(w > 324){
        speed2 = -3;
    } 
    if(w < 90){
        speed2 = 3;
    } 
	w+=speed2;
	
	//Colisão com Urso
	if(dist(x,y, w, 324) < 30){
		vidas--;
		pontos = 0;
		x = 29;
		y = 81;
		renovaCenario();
		j = cenario[0].length;
		i = cenario.length;	
	}
	
	//Movimento e Objetos do nível 3 - porco
	textSize(23);
  	text("🐷", 393,a);
  	if(a > 436){
        speed3 = -4;
    } 6
    if(a < 90){
        speed3 = 4;
    } 
	a+=speed3;
	//Colisão com Porco
	if(dist(x,y, 393, a)<30){
		vidas--;
		pontos = 0;
		x = 29;
		y = 81;
		renovaCenario();
		j = cenario[0].length;
		i = cenario.length;	
	}
	//Movimento e Objetos do nível 4 - sapo
	textSize(23);
  	text("🐸", 30.5,b);
  	if(b > 436){
        speed4 = -4.5;
    } 
    if(b < 270){
        speed4 = 4.5;
    } 
	b+=speed4;
	//Colisão com Sapo
	if(dist(x,y, 30.5, b)<30){
		vidas--;
		pontos = 0;
		x = 29;
		y = 81;
		renovaCenario();
		j = cenario[0].length;
		i = cenario.length;	

	}
	//Movimento e Objetos do nível 5 - coelho
	textSize(23);
  	text("🐰", 90,c);
  	if(c > 180){
        speed5 = -4.5;
    } 
    if(c < 85){
        speed5 = 4.5;
    } 
	c+=speed5;
	
	//Colisão com Coelho
	if(dist(x,y, 90, c)<30){
		vidas--;
		pontos = 0;
		x = 29;
		y = 81;
		renovaCenario();
		j = cenario[0].length;
		i = cenario.length;	
	}
	//Informações do jogo
	textSize(17);
	fill(0);
	textFont("OCR A Std, monospace");
	text("Nível: "+nivel, 5, 19);
	text("Pontos: "+pontos, 110, 19);

	//Animação
	textSize(50);
	fill(255,102,102);
	text(" +3 ", xExtraPt, yExtraPt);
	fill(0);
	tempo++;
	textSize(17);
	text("Tempo: "+Math.floor(tempo/30)+"s", 245, 19);
	text("Vidas: "+vidas, 365, 19);
	pontuacao();
	// (parseInt((Date.now()-tempoDeInicio)/1000))
	yExtraPt -= 15;
	if (alphaTransicao > 0&&testvar){
		if (nivel==1)
			tempo = 0;
		alphaTransicao -= 7;
		fill(0, 0, 0, alphaTransicao);
		rect(0, 0, 450, 480);
		fill(255, 255, 255, alphaTransicao);
		textSize(70);
		text("Nível " +nivel, 100, 250);
	}
	if (vidas == 0){
		fill(102,	205,170);
		rect(0, 0, 450, 480);
		fill(255, 255, 255);
		textSize(80);
		text("💔",190,160);
		text("Game Over", 15, 280);
		textSize(35);
		text("Espere 2 segundos", 50, 320);
		tg++;
		if(tg/30==2){
			tg = 0;
			x = 29;
			y = 81;
			w = -12399123;
			a = -19341232;
			b = -1239123;
			c = -12391823;
			nivel = 1;
			renovaCenario();
			j = cenario[0].length;
			i = cenario.length;	
			vidas+=2;
			tempo = new Date(Date.now()).getSeconds();
		}
	}	
	
	if (nivel == 6){
		fill(102,205,170);
		rect(0, 0, 450, 480);
		fill(255, 255, 255);
		textSize(80);
		text("🌟", 180, 125);
		textSize(20);
		if (tempoFim)
			text("Parabéns! Terminou em " + Math.floor(tempoFim/30) + "s! ", 75, 240);
		textSize(20);
		text("Agora você é membro da equipe.", 55, 280);
		textSize(42);
		text("🐹 🐻 🐷 🐸 🐰",80,345);
		tg++;
		if(tg/30==5){
			x = 29;
			y = 81;
			renovaCenario();
			j = cenario[0].length;
			i = cenario.length;	
			vidas++;
		}
	}	
}

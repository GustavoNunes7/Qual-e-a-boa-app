// ================================================================================
// index.js - Qual é a boa?
// ===============================================================================

//ETAPA 1 - TRAZER A FERRAMENTAS (import)
import { use, useEffect, useState } from "react";
// View -> uma caixa, serve para argupar e organizar as coisas
// Text -> Tofo texto precisa estar dentro de um <text>
// TextInput -> um campo para digitar
// pressable -> qualquer coisa que dá pra tocar: nosso botão
// StyleSheet -> ferramenta pra escrever os estilos
import { View, Text, TextInput, Pressable, ScrollView, styleSheet } from "react-native";
import { cores } from "../data/tema";
import { Accelerometer } from "expo-sensors";
import * as Haptics from "expo-haptics;"


const LIMITE_DE_FORCA = 1.8;
const TEMPO_ENTRE_SORTEIOS = 1000; //milissegundos: 1000 = 1 segundo

// ETAPA 01 - CRIAR A TELA

export default function Home(){
    //começa com 3 opções para já ter o que sortear
    const[opcoes, setOpcoes] = useState(["Pizza", "Hambúrger", "Sushi"]);
    
    // A opção que foi sorteada. Começa vazia (""), porque ainda não sorteou
    const[resultado, setResultado] = useState("");

    const[textoDigitado, setTextoDigitado] = useState("")

    // FUNÇÃO SORTEAR
    function sortear(){
        if(opcoes.length < 2){
            setResultado("Adicione pelo menos 2 opções!");
            return;
        }

        // Como sortear uma posição da lista:
        // 1) Math.random() - número aleatório entre 0 e 1
        // 2) x opcoes.lenght - multiplica pelo tamanho da lista
        // 3) Math.floor() - arredonda para Baixo
        const posicao = Math.floor(Math.random() * opcoes.length);

        //opcoes[2] pega o item que está na posição 2 da lista
        const opcaoSorteada = opcoes[posicao];
        setResultado(opcaoSorteada) //aqui ele guarda no useState a tela atualizada!

        //aqui faz o celular vibrar avisando que saiu o resultado
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

    }

    //FUNÇÃO DE ADICIONAR UMA OPÇÃO
    function adicionar(){
        //trim: retira os espaços do fim e do começo
        const nome = textoDigitado.trim();

        if(nome === ""){
            return; //Campo vazio? -----> Não Adiciona NADA!
        }

        const listaNova = [...opcoes, nome]
        setOpcoes(listaNova);
        setTextoDigitado(""); // Limpa o campo para digitar a próxima.
    }


    //FUNÇÃO DE REMOVER UMA OPÇÃO
    function remover(nomeParaRemover){

        const listaNova = opcoes.filter((opcao) => opcao !== nomeParaRemover);
        setOpcoes(listaNova);
    }
    
    //SOTEART AO CHACOALHAR
    // Nós vamos usar aqui o useEffect, e o sensor
    // useEffect = "faça isto DEPOIS que a tela aparecer"
    //usamos para LIGAR o sensor , epara DESLIGAR quando a tela sair
    useEffect(() =>{

        //aqui pede ao sensor para medir a cada 100 milisssegundos (10z por segundo)
        Accelerometer.setUpdateInterval(100)

        // Guarda a hora do último sorteio, para não sortear 10 vezes
        // COmeça com zero(nunca sorteou)
        // let (e não const) porque este valor vai mudar
        let horaDoUltimoSorteio = 0

        //addListener = "Me avise toda vez que o sensor medir algo novo"
        //"dados" chega com as medidades: dados.x, dados.y e dados.z
        const sensor = Accelerometer.addListener((dados) =>{
            const forca = Math.hypot(dados.x, dados.y,dados.z);
            const agora = Date.now();
            const tempoPassado = agora - horaDoUltimoSorteio;


            // 1- chacoalhou forte (forca maior que o limite)
            // 2 - já passou tempo suficente desde o ultimo sorteio
            if(forca > LIMITE_DE_FORCA && tempoPassado > TEMPO_ENTRE_SORTEIOS){
                horaDoUltimoSorteio = agora;
                sortear();
            }
        });
        // a função é desenvolvida aqui é a "LIMPEZA": roda quando a tela sai
        // Desliga o sensor (como apagar a luz ao sair do quarto)
        return () => sensor.remove();
        //[opcoes] diz "religue o sensor sempre que a lista mudar"


    },[opcoes]);

}
// ================================================================================
// index.js - Qual é a boa?
// ===============================================================================

//ETAPA 1 - TRAZER A FERRAMENTAS (import)
import { useEffect, useState } from "react";
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

}
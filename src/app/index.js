// ===================================== //
// index.js - Qual é a boa?
// ===================================== //

// ETAPA INICIAL - TRAZER AS FERRAMENTAS (import)
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { cores } from "../data/tema";
import { Accelerometer } from "expo-sensors";
import * as Haptics from "expo-haptics";

const LIMITE_DE_FORCA = 1.8;
const TEMPO_ENTRE_SORTEIOS = 1000; // milissegundos: 1000 = 1 segundo

// ETAPA 01 - CRIAR A TELA
export default function Home() {
  // começa com 3 opções para já ter o que sortear
  const [opcoes, setOpcoes] = useState(["Pizza", "Hambúrger", "Sushi"]);
  // A opção que foi sorteada. Começa vazia ("") porque ainda não sorteou
  const [resultado, setResultado] = useState("");
  // O que a pessoa está digitando no campo. neste caso começa vazio.
  const [textoDigitado, setTextoDigitado] = useState("");

  // FUNÇÃO SORTEAR
  function sortear() {
    if (opcoes.length < 2) {
      setResultado("Adicione pelo menos 2 opções!");
      return;
    }
    const posicao = Math.floor(Math.random() * opcoes.length);
    const opcaoSorteada = opcoes[posicao];
    setResultado(opcaoSorteada);

    // faz o celular vibrar avisando que saiu o resultado
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  // FUNÇÃO DE ADICIONAR UMA OPÇÃO
  function adicionar() {
    const nome = textoDigitado.trim();
    if (nome === "") {
      return; // campo vazio? ----> Não adiciona NADA!
    }
    const listaNova = [...opcoes, nome];
    setOpcoes(listaNova);
    setTextoDigitado(""); // limpa o campo para digitar a próxima.
  }

  // FUNÇÃO DE REMOVER UMA OPÇÃO
  function remover(nomeParaRemover) {
    const listaNova = opcoes.filter((opcao) => opcao !== nomeParaRemover);
    setOpcoes(listaNova);
  }

  // SORTEAR AO CHACOALHAR
  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    let horaDoUltimoSorteio = 0;

    const sensor = Accelerometer.addListener((dados) => {
      const forca = Math.hypot(dados.x, dados.y, dados.z);
      const agora = Date.now();
      const tempoPassado = agora - horaDoUltimoSorteio;

      if (forca > LIMITE_DE_FORCA && tempoPassado > TEMPO_ENTRE_SORTEIOS) {
        horaDoUltimoSorteio = agora;
        sortear();
      }
    });

    return () => sensor.remove();
  }, [opcoes]);

  // DESENHAR A TELA --> JSX
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Qual é a boa? 🎲</Text>
      <Text style={styles.subtitulo}>Monte a lista e chacoalhe o celular</Text>

      <View style={styles.resultadoCard}>
        <Text style={styles.resultadoTexto}>
          {resultado === "" ? "📳 Chacoalhe!" : resultado}
        </Text>
      </View>

      {/* Criando o Botão de Sortear */}
      <Pressable style={styles.botaoSortear} onPress={sortear}>
        <Text style={styles.textBotao}>Sortear sem chacoalhar</Text>
      </Pressable>

      {/* TITULO DA LISTA */}
      <Text style={styles.secaoTitulo}>Opções ({opcoes.length})</Text>

      {/* CAMPO MAIS BOTÃO */}
      <View style={styles.linhaInput}>
        <TextInput
          style={styles.input}
          value={textoDigitado}
          onChangeText={setTextoDigitado}
          onSubmitEditing={adicionar}
          placeholder="Digite uma opção..."
          placeholderTextColor={cores.textoSecundario}
        />
        <Pressable style={styles.botaoAdd} onPress={adicionar}>
          <Text style={styles.textBotao}>+</Text>
        </Pressable>
      </View>

      {opcoes.map((opcao) => (
        <View key={opcao} style={styles.item}>
          <Text style={styles.itemTexto}>{opcao}</Text>
          <Pressable onPress={() => remover(opcao)}>
            <Text style={styles.remover}>X</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

// ===============================================================================
// ESTILOS
// ===============================================================================
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: cores.fundo 
  },
  conteudo: { 
    padding: 20, 
    paddingTop: 60, 
    paddingBottom: 40 
  },
  titulo: { 
    fontSize: 30, 
    fontWeight: "bold", 
    color: cores.textoPrincipal 
  },
  subtitulo: { 
    fontSize: 15, 
    color: cores.textoSecundario, 
    marginTop: 4, 
    marginBottom: 24 
  },
  resultadoCard: {
    backgroundColor: cores.fundoCard,
    borderColor: cores.roxo,
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  resultadoTexto: {
    fontSize: 32, // CORRIGIDO AQUI (estava fontSize32:32)
    fontWeight: "bold",
    color: cores.textoPrincipal,
    textAlign: "center",
  },
  botaoSortear: {
    backgroundColor: cores.roxo,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    marginTop: 16,
  },
  textBotao: { 
    color: cores.textoPrincipal, 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  secaoTitulo: { // CORRIGIDO AQUI (no JSX você chamou secaoTitulo, mas na folha estava secaoBotao)
    fontSize: 18,
    fontWeight: "bold",
    color: cores.textoPrincipal,
    marginTop: 32,
    marginBottom: 12,
  },
  item: {
    backgroundColor: cores.fundoCard,
    borderColor: cores.borda,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTexto: { 
    color: cores.textoPrincipal, 
    fontSize: 16 
  },
  linhaInput: { 
    flexDirection: "row", 
    gap: 8, 
    marginBottom: 12 
  },
  input: {
    flex: 1,
    backgroundColor: cores.fundoCard,
    color: cores.textoPrincipal,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  botaoAdd: {
    backgroundColor: cores.verde,
    borderRadius: 12,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  remover: { 
    color: cores.textoSecundario, 
    fontSize: 18 
  },
});
// ================================================================================
// A "MOLDURA" que envolve todas as telas do app
// ================================================================================

//  CONCEITO: import
// "Import" traz para cá uma ferramenta que outra pessoa já criou !

// Stack: "pilha de tela". Quando o app tem várias telas, uma abre por cima da outra, como cartas empilhadas. Vem do pacote expo-router.
import { Stack } from "expo-router";

// Status = a barra lá em cima do celular (relogio, bateria, sinal)
import { StatusBar } from "expo-status-bar";

// CONCEITO
// No React Native, cada pedaço de tela é um componente.
// Um componente é só uma FUNÇÃO que devolve (return) o que aparece.

export default function layout(){
    return(
        <> 
            {/* StatusBar: style="light deixa o relógio e bateria brancos*/ }
            <StatusBar style="light"/>
            {/* Stack: a pilha de telas*/ }
            {/* ScreenOptions: opções que valem para todas as telas */ }
            {/* headerShown: esconde a barra do titulo que o expo coloca no topo por padrão */ }
            <Stack screenOptions={{ headerShown: false}}/>
        </> 
    );

}
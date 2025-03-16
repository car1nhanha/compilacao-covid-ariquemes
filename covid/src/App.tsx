import { LineChart } from "lucide-react";
import { ChartComponent } from "./chart";

function App() {
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <LineChart className="header-icon" />
          <div>
            <h1 className="title">Covid Ariquemes</h1>
            <p className="subtitle">Comparação entre primeira dose, óbitos e confirmados</p>
          </div>
        </div>
        <div className="chart-container">
          <ChartComponent />
        </div>
        <div className="content-grid">
          <div className="video-container">
            <iframe
              src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FPrefeituraAriquemes%2Fvideos%2F282327149520882%2F&show_text=false&width=560&t=811"
              width="560"
              height="314"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
          <div className="text-content">
            <h2>Uso de Ivermectina para tratamento precoce da Covid-19</h2>
            <p className="date">
              <strong>17/07/2020</strong> - Sob o governo do prefeito Thiago Flores, a prefeitura de Ariquemes começou a
              distribuir Ivermectina para a população como forma de conter o avanço da Covid-19. A decisão foi tomada
              sem respaldo científico e contrariando recomendações de órgãos de saúde nacionais e internacionais.
            </p>

            <h3>Problemática</h3>
            <p>
              Desde o início da pandemia, estudos científicos demonstraram que a Ivermectina não possuía eficácia
              comprovada contra a Covid-19. Mesmo assim, seu uso foi amplamente incentivado, resultando na falsa
              sensação de segurança, desinformação e atraso na adoção de medidas efetivas, como vacinação e isolamento
              social.
            </p>
            <p>
              Além da ineficácia, a distribuição indiscriminada do medicamento levou a diversos problemas de saúde
              pública e impactos negativos na população.
            </p>

            <h3>Consequências do Uso Indiscriminado</h3>
            <p>
              O uso abusivo da Ivermectina e de outros medicamentos sem eficácia comprovada não foi apenas inócuo contra
              a Covid-19 — ele também trouxe riscos adicionais à saúde da população. Entre os problemas causados pelo
              uso indiscriminado do medicamento, destacam-se:
            </p>

            <ul>
              <li>
                <strong>Toxicidade hepática:</strong> Casos de hepatite medicamentosa foram relatados em diversos
                estados brasileiros devido ao uso prolongado e em altas doses da Ivermectina. Hospitais registraram
                pacientes com quadros graves de inflamação no fígado, alguns necessitando de transplante hepático.
              </li>
              <li>
                <strong>Aumento da resistência parasitária:</strong> A Ivermectina é um antiparasitário eficaz contra
                diversas infecções, como sarna e oncocercose. O uso desnecessário e prolongado pode favorecer o
                desenvolvimento de resistência em parasitas, comprometendo a eficácia do medicamento para quem realmente
                precisa dele.
              </li>
              <li>
                <strong>Efeitos colaterais:</strong> O uso excessivo de Ivermectina levou a um aumento nos casos de
                efeitos adversos, como diarreia, náusea, tontura, prurido e reações neurológicas, incluindo confusão
                mental e convulsões.
              </li>
              <li>
                <strong>Desvio de recursos públicos:</strong> A compra massiva de medicamentos ineficazes desviou
                investimentos que poderiam ter sido aplicados na aquisição de insumos hospitalares, na ampliação de
                leitos de UTI e no suporte a programas de testagem e rastreamento de contatos.
              </li>
            </ul>

            <h3>Conclusão</h3>
            <p>
              O incentivo ao uso da Ivermectina para a Covid-19 representou um erro grave de gestão da crise sanitária.
              A politização do tratamento, o incentivo à desinformação e a negligência em seguir diretrizes científicas
              contribuíram para o agravamento da pandemia. Esse episódio reforça a necessidade de políticas públicas
              baseadas em evidências e no compromisso com a saúde da população.
            </p>
          </div>
        </div>
        <div className="sources">
          <h3>Fontes:</h3>
          <ul>
            <li>
              <a href="https://pubmed.ncbi.nlm.nih.gov/36762224/" target="_blank" rel="noopener noreferrer">
                New study shows ivermectin lacks meaningful benefits in COVID-19 treatment
              </a>
            </li>
            <li>
              <a
                href="https://www.paho.org/en/news/17-11-2021-americas-report-surge-drug-resistant-infections-due-misuse-antimicrobials-during"
                target="_blank"
                rel="noopener noreferrer"
              >
                Americas report surge in drug-resistant infections due to misuse of antimicrobials during pandemic
              </a>
            </li>
            <li>
              <a
                href="https://www.thelancet.com/journals/lanmic/article/PIIS2666-5247(21)00039-2/fulltext"
                target="_blank"
                rel="noopener noreferrer"
              >
                COVID-19 drug practices risk antimicrobial resistance evolution
              </a>
            </li>
            <li>
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5929173/" target="_blank" rel="noopener noreferrer">
                Serious Neurological Adverse Events after Ivermectin—Do They Occur beyond the Indication of
                Onchocerciasis?
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

# Plataforma Clima

Plataforma com vários produtos relacionados ao clima.

## Produtos

#### Visualização de dados de satélite em tempo real:

Visualizações:

* * Mapa com valores atuais na grade de satélite
  * Vídeo com últimos 15 mapas
  * Gráfico de linha com valor médio de um ponto dos últimos 15 mapas

Produtos de satélite (9 atualmente):

* * Precipitação (Rain Rate)
  * Índice de estabilidade da atmosfera (7 indicadores: CP, KI, LI, TT, SI, TPW)
  * Temperatura do Oceano

Frequência de atualização: a cada 20 min

Exemplos de dados: [https://rnc.dados.rio/](https://rnc.dados.rio/)

#### Visualização de dados de radar em tempo real:

Visualizações:

* * Mapa com valores atuais
  * Vídeo com últimos 15 mapas

Produtos de radar:

* * Refletividade
  * Velocidade do vento
  * Granizo

Frequência de atualização: a cada 5 min

Exemplos de dados:

#### Visualização previsão de chuva Rionowcast:

Visualizações:

* * Mapa com valores preditos em grade de 3 x 3km

Produtos:

* * provenientes da ConvLSTM que tem como fonte de dados radar e pluviômetro e previsões em janelas futuras de 1h, 2h, 3h
  * provenientes da ConvLSTM que tem como fonte de dados satélite e, possivelmente, previsões em janelas futuras de 1h, 2h, 3h

Frequência de atualização: indefinido

Exemplos de dados: não temos uma primeira visualização

#### Visualização previsão de chuva IMPA:

Visualizações:

* * Mapa com valores atuais em grade de ? para satélite
  * Mapa com valores atuais em grade de ? para radar
  * Mapa com valores preditos em grade de ? para radar
  * Mapa com valores preditos em grade de ? para satélite

Produtos:

* * indefinidos

Frequência de atualização: indefinido

Exemplos de dados:

### Onde está alagado agora?

Visualizações

* Mapa com valores atuais de onde está alagado

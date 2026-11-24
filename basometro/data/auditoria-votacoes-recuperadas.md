# Auditoria de 24 votações nominais da Câmara

Em 24 de novembro de 2026, o Basômetro incorporou 24 votações abertas do Plenário e 9.624 votos individuais. Os boletins da Câmara identificam os votantes, publicam o placar e registram a orientação do Governo. Na data da auditoria, a API retornava uma lista vazia em `/votacoes/{id}/votos` para todos os 24 registros. As votações também estavam ausentes das tabelas de votações, votos e orientações da [versão do Political Eye usada na importação histórica](https://github.com/mbottoni/political-eye/tree/b4e286d843b7dae17fdc4fc803fb5d12388ea75e/data/camara).

Para conferir estes registros em futuras importações, use o boletim vinculado a cada ID. Uma resposta vazia da API, por si só, não justifica excluir uma votação documentada nesta tabela.

## Conferência

A data é a da sessão, inclusive quando a votação terminou após a meia-noite. A identificação da proposição, a descrição e a ordem de registro vieram das tabelas anuais da Câmara. Os nomes e as UFs do boletim foram associados aos IDs dos deputados. Cada deputado aparece uma única vez por votação. A contagem dos votos individuais reproduz, separadamente, as quatro colunas do placar abaixo. A obstrução entra no denominador do Basômetro e conta como apoio quando coincide com a orientação do Governo.

Para a agregação por bancada, foram usadas as siglas partidárias da época. Duas filiações divergiam do cabeçalho partidário dos boletins. O histórico da Câmara registra Alberto Filho no PP desde 18 de abril de 2016 e Tabata Amaral no PSB desde 28 de setembro de 2021. Foram usadas essas filiações nas votações posteriores às mudanças. [Histórico de Alberto Filho](https://dadosabertos.camara.leg.br/api/v2/deputados/160582/historico) · [Histórico de Tabata Amaral](https://dadosabertos.camara.leg.br/api/v2/deputados/204534/historico)

| Sessão | ID da votação | Governo | Sim | Não | Abstenção | Obstrução | Fonte |
|---|---|---|---:|---:|---:|---:|---|
| 01/03/2016 | 1806249-34 | Não | 40 | 284 | 5 | 66 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=6840) |
| 31/05/2016 | 2082526-6 | Sim | 333 | 12 | 2 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=7010) |
| 05/10/2016 | 2112897-6 | Sim | 278 | 39 | 0 | 61 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=7186) |
| 05/10/2016 | 2078295-198 | Sim | 292 | 101 | 1 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=7197) |
| 10/10/2016 | 2088351-208 | Sim | 321 | 12 | 1 | 77 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=7208) |
| 10/10/2016 | 2088351-210 | Não | 22 | 284 | 0 | 54 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=7209) |
| 30/11/2016 | 553947-203 | Sim | 327 | 75 | 5 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=7308) |
| 15/03/2017 | 553947-246 | Sim | 376 | 7 | 2 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=7419) |
| 02/08/2017 | 2143164-138 | Sim | 263 | 227 | 2 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=7679) |
| 25/10/2017 | 2152748-115 | Sim | 251 | 233 | 2 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=7946) |
| 29/11/2017 | 2082483-88 | Sim | 364 | 2 | 0 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=8068) |
| 12/12/2017 | 2148733-10 | Sim | 355 | 2 | 1 | 35 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=8133) |
| 04/09/2019 | 2216788-10 | Sim | 330 | 98 | 0 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=9090) |
| 19/11/2019 | 2197504-81 | Sim | 387 | 7 | 1 | 4 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=9247) |
| 26/08/2020 | 2229504-35 | Não | 53 | 384 | 0 | 0 | [Boletim da Câmara](https://www.camara.leg.br/presenca-comissoes/votacao-portal?reuniao=59894&itemVotacao=33378) |
| 10/12/2020 | 2261121-95 | Não | 96 | 264 | 0 | 0 | [Boletim da Câmara](https://www.camara.leg.br/presenca-comissoes/votacao-portal?reuniao=60197&itemVotacao=35594) |
| 14/12/2020 | 2205645-95 | Não | 41 | 361 | 0 | 0 | [Boletim da Câmara](https://www.camara.leg.br/presenca-comissoes/votacao-portal?reuniao=60198&itemVotacao=35727) |
| 13/05/2021 | 257161-385 | Sim | 321 | 129 | 1 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=9614) |
| 26/05/2021 | 2268416-42 | Não | 124 | 251 | 0 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=9696) |
| 08/06/2021 | 2270902-52 | Sim | 326 | 76 | 1 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=9743) |
| 06/10/2021 | 2285889-98 | Sim | 266 | 109 | 0 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=10202) |
| 18/09/2024 | 2452037-91 | Sim | 292 | 167 | 2 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=12392) |
| 09/12/2025 | 2358548-67 | Não | 271 | 124 | 0 | 0 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=13427) |
| 09/12/2025 | 2358548-96 | Obstrução | 231 | 23 | 3 | 67 | [Boletim da Câmara](https://www.camara.leg.br/internet/votacao/mostraVotacao.asp?ideVotacao=13433) |

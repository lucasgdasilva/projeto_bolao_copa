function carregarJogos() {
  const url = "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://raw.githubusercontent.com/rezarahiminia/worldcup2026/main/football.matches.json");

  fetch(url)
    .then(res => res.json())
    .then(jogos => {
      const container = document.getElementById("lista-jogos");
      container.innerHTML = "";

      jogos.forEach(jogo => {
        const div = document.createElement("div");
        div.style.marginBottom = "15px";

        const horario = jogo.kickoff_utc
          ? new Date(jogo.kickoff_utc).toLocaleString("pt-BR")
          : "Data não definida";

        div.innerHTML = `
          <strong>${jogo.home_team}</strong> vs <strong>${jogo.away_team}</strong><br>
          Estádio: ${jogo.stadium ?? "Não informado"}<br>
          Horário: ${horario}<br>
          Status: ${jogo.status}<br>
          Placar: ${jogo.score?.home ?? "-"} x ${jogo.score?.away ?? "-"}
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar jogos:", err);
      document.getElementById("lista-jogos").innerHTML = "<p>Erro ao carregar jogos.</p>";
    });
}

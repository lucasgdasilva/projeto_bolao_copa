function carregarJogos() {
  const dataSelecionada = document.getElementById("data").value;

  fetch("jogos.json")
    .then(res => res.json())
    .then(jogos => {
      const container = document.getElementById("lista-jogos");
      container.innerHTML = "";

      const jogosDoDia = jogos.filter(jogo => {
        if (!jogo.DateUtc) return false;
        const dataJogo = new Date(jogo.DateUtc).toISOString().split("T")[0];
        return !dataSelecionada || dataJogo === dataSelecionada;
      });

      if (jogosDoDia.length === 0) {
        container.innerHTML = "<p>Nenhum jogo encontrado para esta data.</p>";
        return;
      }

      jogosDoDia.forEach(jogo => {
        const card = document.createElement("div");
        card.classList.add("jogo-card");

        const dataFormatada = new Date(jogo.DateUtc).toLocaleDateString("pt-BR");

        card.innerHTML = `
          <div class="jogo-data">${dataFormatada}</div>
          <div class="jogo-times">
            <div class="time">
              <img src="flags/${jogo.HomeTeam}.png" alt="${jogo.HomeTeam}" class="bandeira">
              <div class="nome-time">${jogo.HomeTeam}</div>
              <input type="number" class="palpite" min="0" placeholder="0">
            </div>
            <div class="versus">vs</div>
            <div class="time">
              <img src="flags/${jogo.AwayTeam}.png" alt="${jogo.AwayTeam}" class="bandeira">
              <div class="nome-time">${jogo.AwayTeam}</div>
              <input type="number" class="palpite" min="0" placeholder="0">
            </div>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar jogos:", err);
      document.getElementById("lista-jogos").innerHTML = "<p>Erro ao carregar jogos.</p>";
    });
}

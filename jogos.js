function carregarJogos() {
  const dataSelecionada = document.getElementById("data").value; // AAAA-MM-DD

  // Lê o arquivo local jogos.json
  fetch("jogos.json")
    .then(res => res.json())
    .then(jogos => {
      const container = document.getElementById("lista-jogos");
      container.innerHTML = "";

      // Filtra jogos pela data escolhida
      const jogosDoDia = jogos.filter(jogo => {
        if (!jogo.DateUtc) return false;
        const dataJogo = new Date(jogo.DateUtc).toISOString().split("T")[0]; // AAAA-MM-DD
        return !dataSelecionada || dataJogo === dataSelecionada;
      });

      if (jogosDoDia.length === 0) {
        container.innerHTML = "<p>Nenhum jogo encontrado para esta data.</p>";
        return;
      }

      // Exibe os jogos encontrados
      jogosDoDia.forEach(jogo => {
        const div = document.createElement("div");
        div.style.marginBottom = "15px";

        const horario = jogo.DateUtc
          ? new Date(jogo.DateUtc).toLocaleString("pt-BR")
          : "Data não definida";

        div.innerHTML = `
          <strong>${jogo.HomeTeam}</strong> vs <strong>${jogo.AwayTeam}</strong><br>
          Estádio: ${jogo.Location ?? "Não informado"}<br>
          Grupo: ${jogo.Group ?? "Não informado"}<br>
          Horário: ${horario}<br>
          Status: ${jogo.Winner ? "Finalizado" : "Agendado"}<br>
          Placar: ${jogo.HomeTeamScore ?? "-"} x ${jogo.AwayTeamScore ?? "-"}
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar jogos:", err);
      document.getElementById("lista-jogos").innerHTML = "<p>Erro ao carregar jogos.</p>";
    });
}

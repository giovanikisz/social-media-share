document
  .getElementById("shareButton")
  .addEventListener("click", async function () {
    // 1. Verifica se a API Web Share é suportada
    if (!navigator.share) {
      alert("A função de compartilhamento não é suportada neste navegador.");
      console.log("API Web Share não suportada neste navegador.");
      return; // Sai da função se não for suportado
    }

    const contentToCapture = document.getElementById("contentToCapture");

    try {
      // 2. Captura o conteúdo da página como um canvas
      const canvas = await html2canvas(contentToCapture, {
        useCORS: true, // Importante para imagens de outros domínios com CORS habilitado
      });

      // 3. Converte o canvas para um Blob (formato de arquivo)
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      // 4. Cria um objeto File a partir do Blob
      const filesArray = [
        new File([blob], "print_da_pagina.png", { type: "image/png" }),
      ];

      // 5. Aciona a função de compartilhamento nativa
      await navigator.share({
        files: filesArray,
        title: "Print da Minha Página",
        text: "Confira este print da minha página web!",
      });

      console.log("Compartilhamento bem-sucedido!");
    } catch (error) {
      console.error("Erro ao capturar ou compartilhar a tela:", error);
      if (error.name === "AbortError") {
        console.log("Compartilhamento cancelado pelo usuário.");
      } else {
        alert(
          "Ocorreu um erro ao tentar compartilhar. Verifique o console para mais detalhes."
        );
      }
    }
  });

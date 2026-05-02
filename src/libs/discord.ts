export const sendToDiscord = async (content: string, embed?: any) => {
  const webhookUrl = "https://discord.com/api/webhooks/1500090847784341574/owjwe3Ny6aEClGO56osbWsQbySZydZSVeCFcD8H-sqfoOLsmux0QEutp68iwNU_oQeOh";
  
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        embeds: embed ? [embed] : [],
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error sending to Discord:", error);
    return false;
  }
};

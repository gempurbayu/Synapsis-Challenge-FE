Cypress.on('uncaught:exception', (err, runnable) => {
  // Abaikan error jika status code adalah 404
  if (err.message.includes('Request failed with status code 404')) {
    return false; // Mengabaikan error
  }
  // Biarkan error lain tetap terdeteksi
  return true;
});

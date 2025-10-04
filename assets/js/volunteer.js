// This file contains JavaScript specific to the volunteer contributions section.
// It handles form submissions and validations for volunteer sign-ups.

document.addEventListener('DOMContentLoaded', function() {
    const volunteerForm = document.getElementById('volunteer-form');

    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(volunteerForm);
            const volunteerData = {};

            formData.forEach((value, key) => {
                volunteerData[key] = value;
            });

            // Enviar datos por WhatsApp (opcional)
            try {
                const name = volunteerData.name || '';
                const email = volunteerData.email || '';
                const message = volunteerData.message || '';
                const wspText = `Hola, quiero sumarme como voluntario(a).%0A%0ANombre: ${encodeURIComponent(name)}%0ACorreo: ${encodeURIComponent(email)}%0AMensaje: ${encodeURIComponent(message)}`;
                const wspUrl = `https://wa.me/56959484424?text=${wspText}`;
                window.open(wspUrl, '_blank');
            } catch (e) {
                console.warn('No se pudo abrir WhatsApp:', e);
            }

            console.log('Volunteer Data:', volunteerData);
            alert('¡Gracias por postularte como voluntario(a)! Te contactaremos pronto.');
            volunteerForm.reset();
        });
    }
});
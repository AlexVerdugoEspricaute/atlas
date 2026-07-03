import Swal from 'sweetalert2';

// Tiempo controlado para vaciar el hilo de renderizado del navegador
const TRANSITION_DELAY = 190; 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const AtlasSwal = Swal.mixin({
    buttonsStyling: false, 
    reverseButtons: true,  
    animation: false, // Desactivamos controladores JavaScript nativos que causan jank
    customClass: {
        popup: 'atlas-logout-popup atlas-hardware-accelerated', 
        confirmButton: 'atlas-logout-confirm-btn', 
        cancelButton: 'atlas-logout-cancel-btn',
        actions: 'atlas-logout-actions'
    },
    showClass: { popup: 'atlas-animate-in' },
    hideClass: { popup: 'atlas-animate-out' }
});

const AtlasToast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    animation: false,
    background: 'rgba(255, 255, 255, 0.95)',
    customClass: {
        popup: 'atlas-minimal-toast atlas-hardware-accelerated'
    },
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    showClass: { popup: 'atlas-toast-in' },
    hideClass: { popup: 'atlas-toast-out' }
});

/**
 * Cierra cualquier indicador activo esperando que termine la animación física en la GPU
 */
export const closeAlerts = async () => {
    if (Swal.isVisible()) {
        Swal.close();
        await delay(TRANSITION_DELAY); // Pausa estratégica para amortiguar el hilo del DOM
    }
};

/**
 * Diálogo Central de Éxito Atlas
 */
export const showSuccess = async (title, message = "") => {
    await closeAlerts(); 
    return AtlasSwal.fire({
        html: `
            <div style="text-align:center; padding:0.5rem 0">
                <div style="width:60px; height:60px; border-radius:50%; background:rgba(46,125,50,0.08); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem">
                    <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="28" height="28" fill="#2e7d32">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                </div>
                <h2 style="font-size:1.2rem; font-weight:700; color:#1a1a2e; margin:0 0 0.5rem">${title}</h2>
                <p style="font-size:0.875rem; color:#6b7280; margin:0">${message}</p>
            </div>
        `,
        confirmButtonText: 'Continuar'
    });
};

/**
 * Diálogo Central de Error Atlas
 */
export const showError = async (title, message = "") => {
    await closeAlerts();
    return AtlasSwal.fire({
        html: `
            <div style="text-align:center; padding:0.5rem 0">
                <div style="width:60px; height:60px; border-radius:50%; background:rgba(211,47,47,0.08); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem">
                    <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="28" height="28" fill="#d32f2f">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                </div>
                <h2 style="font-size:1.2rem; font-weight:700; color:#1a1a2e; margin:0 0 0.5rem">${title}</h2>
                <p style="font-size:0.875rem; color:#6b7280; margin:0">${message}</p>
            </div>
        `,
        confirmButtonText: 'Reintentar'
    });
};

/**
 * Diálogo unificado de Confirmación para el Cierre de Sesión
 */
export const showConfirmLogout = async () => {
    await closeAlerts();
    return AtlasSwal.fire({
        html: `
            <div style="text-align:center; padding:0.5rem 0">
                <div style="width:60px; height:60px; border-radius:50%; background:rgba(110,13,37,0.08); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem">
                    <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="28" height="28" fill="#6E0D25">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                    </svg>
                </div>
                <h2 style="font-size:1.2rem; font-weight:700; color:#1a1a2e; margin:0 0 0.5rem">¿Cerrar sesión?</h2>
                <p style="font-size:0.875rem; color:#6b7280; margin:0">Serás redirigido al inicio de sesión.</p>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Cerrar Sesión',
        cancelButtonText: 'Cancelar'
    });
};

export const showSuccessToast = async (title) => {
    await closeAlerts();
    return AtlasToast.fire({
        icon: 'success',
        title,
        iconColor: '#2e7d32',
        customClass: { popup: 'atlas-minimal-toast atlas-hardware-accelerated' }
    });
};

export const showErrorToast = async (title) => {
    await closeAlerts();
    return AtlasToast.fire({
        icon: 'error',
        title,
        iconColor: '#d32f2f',
        customClass: { popup: 'atlas-minimal-toast atlas-hardware-accelerated' }
    });
};

/**
 * Indicador de Carga Cinemático
 */
export const showLoadingOverlay = (message = "Autenticando...") => {
    Swal.fire({
        title: message,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false,
        customClass: {
            popup: 'atlas-loading-popup atlas-hardware-accelerated',
            title: 'atlas-loading-title'
        },
        showClass: { popup: 'atlas-animate-in' },
        hideClass: { popup: 'atlas-animate-out' },
        didOpen: () => {
            Swal.showLoading();
            const loader = document.querySelector('.swal2-loader');
            if (loader) loader.style.borderLeftColor = '#6E0D25';
        }
    });
};

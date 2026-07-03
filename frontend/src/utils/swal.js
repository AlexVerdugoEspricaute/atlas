import Swal from "sweetalert2";

const Atlas = Swal.mixin({
    confirmButtonColor: "#6E0D25",
    cancelButtonColor: "#6b7280",
    reverseButtons: true,
    customClass: { popup: "atlas-swal" },
});

export default Atlas;

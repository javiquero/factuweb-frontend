function formatDate(str, hours = false) {
    var d = new Date(str);
    let v = d.toLocaleString("es-ES", {
        timeZone: "Europe/Madrid"
    });
    return hours ? v : v.split(" ")[0];
}



function formatCurrency(str) {
    return Number(parseFloat(str)).toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR"
    });
}

function longpress(node, threshold = 500) {
    // note — a complete answer would also consider touch events
  
    const handle_mousedown = (event) => {
      let start = Date.now();
      const timeout = setTimeout(() => {
        node.dispatchEvent(new CustomEvent('longpress', {detail: {first:event?true:false}}));
        handle_mousedown();
      }, threshold);
  
      const cancel = () => {
        clearTimeout(timeout);
        node.removeEventListener('mousemove', cancel);
        node.removeEventListener('mouseup', cancel);
      };
  
      node.addEventListener('mousemove', cancel);
      node.addEventListener('mouseup', cancel);
    }
  
    node.addEventListener('mousedown', handle_mousedown);
  
    return {
      destroy() {
        node.removeEventListener('mousedown', handle_mousedown);
      }
    };
  }

export {
    formatDate,
    formatCurrency,
    longpress
}

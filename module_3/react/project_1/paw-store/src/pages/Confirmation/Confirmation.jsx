import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './Confirmation.css';

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || {};

  // guard to prevent access to the confirmation page without order data
  if (!orderData) {
    return (
      <main className="confirmation">
        <h1 className="confirmation__no-order-message">
          No hay una compra reciente para mostrar.
        </h1>

        <button
          className="confirmation__products-button"
          onClick={() => navigate(ROUTES.PRODUCTS)}
        >
          Volver a catálogo
        </button>
      </main>
    );
  }

  return (
    <main className="confirmation">
      <h1 className="confirmation__title">¡Gracias por tu compra!</h1>

      {orderData?.sendEmail && (
        <p className="confirmation__email-message">
          Hemos enviado un correo de confirmación con los detalles de tu pedido.
        </p>
      )}

      {orderData?.buyer && (
        <h3 className="confirmation__buyer-message">
          Resumen de tu compra {orderData.buyer.name}:
        </h3>
      )}

      {orderData?.items && (
        <table className="confirmation__order-table">
          {' '}
          <thead>
            {' '}
            <tr>
              {' '}
              <th>Artículo</th> <th>Cantidad</th> <th>Precio</th>{' '}
              <th>Subtotal</th>{' '}
            </tr>{' '}
          </thead>{' '}
          <tbody>
            {' '}
            {orderData.items.map((item) => (
              <tr key={item.id}>
                {' '}
                <td>{item.nombre}</td> <td>{item.cantidad}</td>{' '}
                <td>₡{item.precio.toLocaleString('es-CR')}</td>{' '}
                <td>₡{item.subtotal.toLocaleString('es-CR')}</td>{' '}
              </tr>
            ))}{' '}
          </tbody>{' '}
          <tfoot>
            <tr className="confirmation__order-total-row">
              <td colSpan="3">Total</td>
              <td>₡{orderData.total.toLocaleString('es-CR')}</td>
            </tr>
          </tfoot>
        </table>
      )}

      <button
        className="confirmation__home-button"
        onClick={() => navigate(ROUTES.PRODUCTS)}
      >
        Volver al catálogo
      </button>
    </main>
  );
}
export default Confirmation;

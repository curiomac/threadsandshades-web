import axios from "axios";
import { BASE_URL } from "../../api/ApiPath";
import { endpoints } from "../../api/EndPoints";
import { printInvoiceFail, printInvoiceRequest, printInvoiceSuccess } from "../slices/printInvoiceSlice";
import { getAuthToken } from "../../helpers/auth-token/getAuthToken";
// import { saveAs } from 'file-saver';

export const printInvoice = (payload) => async (dispatch) => {
    try {
      dispatch(printInvoiceRequest());
  
      const response = await axios.get(
        `${BASE_URL}/${endpoints.order.print_invoice}/${payload.order_id}`,
        {
          responseType: 'arraybuffer', // Ensure the response is treated as an arraybuffer
          withCredentials: true,
          headers: {
            Authorization: `${getAuthToken()}`,
          },
        }
      );
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoice.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
  
      dispatch(printInvoiceSuccess(response.data));
    } catch (error) {
      dispatch(printInvoiceFail(error?.response?.data?.message));
    }
  };
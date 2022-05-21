import axiosClient from "./axiosClient";

const INVOICE_API = "/invoices";

const invoiceApi = {
  getInvoices: () => {
    const url = INVOICE_API;
    return axiosClient.get(url);
  },
  getInvoiceDetail: (id: string) => {
    const url = INVOICE_API + "/" + id;
    return axiosClient.get(url);
  },

  updateInvoice: (id: string, params: any) => {
    const url = INVOICE_API + "/" + id;
    return axiosClient.put(url, params);
  },
};
export default invoiceApi;

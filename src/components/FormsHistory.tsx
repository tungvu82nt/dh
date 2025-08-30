import React from 'react';
import { Trash2, FileText } from 'lucide-react';
import { ShippingForm } from '../types';
import { Language, getTranslation } from '../utils/translations';

interface FormsHistoryProps {
  forms: ShippingForm[];
  onFormsChange: (forms: ShippingForm[]) => void;
  language: Language;
}

const FormsHistory: React.FC<FormsHistoryProps> = ({ forms, onFormsChange, language }) => {
  const deleteForm = (id: number) => {
    if (confirm(getTranslation(language, 'confirmDeleteForm'))) {
      onFormsChange(forms.filter(f => f.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{getTranslation(language, 'formsHistoryTitle')}</h2>
      
      {forms.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <FileText size={48} className="mx-auto mb-4 opacity-50 text-gray-400" />
          <p className="text-gray-500 text-lg">{getTranslation(language, 'noFormsYet')}</p>
          <p className="text-gray-400 text-sm mt-2">{getTranslation(language, 'createFirstForm')}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="border-2 border-black p-3 text-center font-bold text-sm">{getTranslation(language, 'codeColumn')}</th>
                  <th className="border-2 border-black p-3 text-center font-bold text-sm">{getTranslation(language, 'dateColumn')}</th>
                  <th className="border-2 border-black p-3 text-center font-bold text-sm">{getTranslation(language, 'customerColumn')}</th>
                  <th className="border-2 border-black p-3 text-center font-bold text-sm">{getTranslation(language, 'quantityColumn')}</th>
                  <th className="border-2 border-black p-3 text-center font-bold text-sm">{getTranslation(language, 'weightColumn')}</th>
                  <th className="border-2 border-black p-3 text-center font-bold text-sm">{getTranslation(language, 'totalWeightColumn')}</th>
                  <th className="border-2 border-black p-3 text-center font-bold text-sm">{getTranslation(language, 'phoneColumn')}</th>
                  <th className="border-2 border-black p-3 text-center font-bold text-sm">{getTranslation(language, 'addressColumn')}</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form, index) => (
                  <tr key={form.id} className="hover:bg-gray-50 transition-colors relative group">
                    <td className="border border-black p-3 text-center text-sm font-mono">
                      {form.id.toString().slice(-6)}
                    </td>
                    <td className="border border-black p-3 text-center text-sm">
                      {new Date(form.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'zh-CN')}
                    </td>
                    <td className="border border-black p-3 text-center text-sm font-medium">
                      {form.customer.name}
                    </td>
                    <td className="border border-black p-3 text-center text-sm">
                      {form.totalQuantity}
                    </td>
                    <td className="border border-black p-3 text-center text-sm">
                      {form.items.map((item, idx) => (
                        <div key={item.id} className="text-xs mb-1 text-center">
                          {item.name}: {item.quantity} x {item.weight} kilogram = {(item.quantity * item.weight).toFixed(2)} kilogram
                        </div>
                      ))}
                    </td>
                    <td className="border border-black p-3 text-center text-sm font-bold text-blue-600">
                      {form.totalWeight.toFixed(2)} kilogram
                    </td>
                    <td className="border border-black p-3 text-center text-sm">
                      {form.customer.phone || '-'}
                    </td>
                    <td className="border border-black p-3 text-center text-sm relative">
                      {form.customer.address}
                      <button
                        onClick={() => deleteForm(form.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                        title={language === 'vi' ? 'Xóa đơn hàng' : '删除订单'}
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormsHistory;
import React from 'react';
import { Trash2, FileText, Loader2, AlertCircle } from 'lucide-react';
import { ShippingForm } from '../types';
import { Language, getTranslation } from '../utils/translations';

interface FormsHistoryProps {
  forms: ShippingForm[];
  onFormDelete: (formId: number) => Promise<void>;
  language: Language;
  loading?: boolean;
  error?: string | null;
}

const FormsHistory: React.FC<FormsHistoryProps> = ({
  forms,
  onFormDelete,
  language,
  loading = false,
  error = null
}) => {
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

  const handleDeleteForm = async (id: number) => {
    if (!confirm(getTranslation(language, 'confirmDeleteForm'))) {
      return;
    }

    try {
      setDeletingId(id);
      await onFormDelete(id);
    } catch (err) {
      console.error('Failed to delete form:', err);
      alert('Lỗi khi xóa đơn hàng. Vui lòng thử lại.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700">Lỗi khi tải dữ liệu: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-gray-800 px-2 lg:px-0">
        {getTranslation(language, 'formsHistoryTitle')}
      </h2>

      {forms.length === 0 ? (
        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md text-center">
          <FileText size={48} className="mx-auto mb-4 opacity-50 text-gray-400" />
          <p className="text-gray-500 text-lg">{getTranslation(language, 'noFormsYet')}</p>
          <p className="text-gray-400 text-sm mt-2">{getTranslation(language, 'createFirstForm')}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="border-2 border-black p-2 lg:p-3 text-center font-bold text-xs lg:text-sm">
                    {getTranslation(language, 'codeColumn')}
                  </th>
                  <th className="border-2 border-black p-2 lg:p-3 text-center font-bold text-xs lg:text-sm">
                    {getTranslation(language, 'dateColumn')}
                  </th>
                  <th className="border-2 border-black p-2 lg:p-3 text-center font-bold text-xs lg:text-sm">
                    {getTranslation(language, 'customerColumn')}
                  </th>
                  <th className="border-2 border-black p-2 lg:p-3 text-center font-bold text-xs lg:text-sm">
                    {getTranslation(language, 'quantityColumn')}
                  </th>
                  <th className="border-2 border-black p-2 lg:p-3 text-center font-bold text-xs lg:text-sm hidden md:table-cell">
                    {getTranslation(language, 'weightColumn')}
                  </th>
                  <th className="border-2 border-black p-2 lg:p-3 text-center font-bold text-xs lg:text-sm">
                    {getTranslation(language, 'totalWeightColumn')}
                  </th>
                  <th className="border-2 border-black p-2 lg:p-3 text-center font-bold text-xs lg:text-sm hidden sm:table-cell">
                    {getTranslation(language, 'phoneColumn')}
                  </th>
                  <th className="border-2 border-black p-2 lg:p-3 text-center font-bold text-xs lg:text-sm">
                    {getTranslation(language, 'addressColumn')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => (
                  <tr key={form.id} className="hover:bg-gray-50 transition-colors relative group">
                    <td className="border border-black p-2 lg:p-3 text-center text-xs lg:text-sm font-mono">
                      {form.id.toString().slice(-6)}
                    </td>
                    <td className="border border-black p-2 lg:p-3 text-center text-xs lg:text-sm">
                      {new Date(form.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'zh-CN')}
                    </td>
                    <td className="border border-black p-2 lg:p-3 text-center text-xs lg:text-sm font-medium">
                      {form.customer.name}
                    </td>
                    <td className="border border-black p-2 lg:p-3 text-center text-xs lg:text-sm">
                      {form.totalQuantity}
                    </td>
                    <td className="border border-black p-2 lg:p-3 text-center text-xs lg:text-sm hidden md:table-cell">
                      {form.items.map((item) => (
                        <div key={item.id} className="text-xs mb-1 text-center">
                          {item.name}: {item.quantity} x {item.weight}kg = {(item.quantity * item.weight).toFixed(2)}kg
                        </div>
                      ))}
                    </td>
                    <td className="border border-black p-2 lg:p-3 text-center text-xs lg:text-sm font-bold text-blue-600">
                      {form.totalWeight.toFixed(2)}kg
                    </td>
                    <td className="border border-black p-2 lg:p-3 text-center text-xs lg:text-sm hidden sm:table-cell">
                      {form.customer.phone || '-'}
                    </td>
                    <td className="border border-black p-2 lg:p-3 text-center text-xs lg:text-sm relative">
                      {form.customer.address}
                      <button
                        onClick={() => handleDeleteForm(form.id)}
                        disabled={deletingId === form.id}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 disabled:text-red-300 p-1 rounded hover:bg-red-50 disabled:hover:bg-transparent transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-100"
                        title={language === 'vi' ? 'Xóa đơn hàng' : '删除订单'}
                      >
                        {deletingId === form.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Trash2 size={12} />
                        )}
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
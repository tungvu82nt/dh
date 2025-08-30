import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { FormItem, ShippingForm } from '../types';
import { Language, getTranslation } from '../utils/translations';

interface Customer {
  id: number;
  name: string;
  address: string;
  phone?: string;
}

interface NewFormProps {
  onFormSave: (form: ShippingForm) => void;
  language: Language;
}

const NewForm: React.FC<NewFormProps> = ({ onFormSave, language }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: ''
  });
  
  const [formItems, setFormItems] = useState<FormItem[]>([]);

  const addProductToForm = () => {
    const newItem: FormItem = {
      id: Date.now(),
      name: '',
      weight: 0,
      quantity: 1,
    };
    setFormItems([...formItems, newItem]);
  };

  const removeProductFromForm = (id: number) => {
    setFormItems(formItems.filter(item => item.id !== id));
  };

  const updateFormItem = (id: number, field: keyof FormItem, value: string | number) => {
    setFormItems(formItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const totalQuantity = formItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = formItems.reduce((sum, item) => sum + (item.quantity * item.weight), 0);

  const saveAndPrintForm = () => {
    if (!customerInfo.name || !customerInfo.address || formItems.length === 0) {
      alert(getTranslation(language, 'selectCustomerAndProducts'));
      return;
    }

    // Check if all form items have valid data
    const hasInvalidItems = formItems.some(item => !item.name || item.weight <= 0 || item.quantity <= 0);
    if (hasInvalidItems) {
      alert('Vui lòng nhập đầy đủ thông tin cho tất cả sản phẩm.');
      return;
    }

    // Create customer object
    const customer: Customer = {
      id: Date.now(),
      name: customerInfo.name,
      address: customerInfo.address,
      phone: customerInfo.phone || undefined
    };

    const newForm: ShippingForm = {
      id: Date.now(),
      customer,
      items: formItems,
      createdAt: new Date().toISOString(),
      totalWeight,
      totalQuantity,
    };

    onFormSave(newForm);
    alert('✅ Đơn hàng đã được lưu thành công!');
    
    // Reset form
    setCustomerInfo({ name: '', address: '', phone: '' });
    setFormItems([]);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{getTranslation(language, 'newFormTitle')}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <h3 className="font-bold text-lg mb-4">{getTranslation(language, 'shippingInfo')}</h3>
          
          {/* Customer Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{getTranslation(language, 'customerName')}</label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder={getTranslation(language, 'customerName')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{getTranslation(language, 'customerAddress')}</label>
              <input
                type="text"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                placeholder={getTranslation(language, 'customerAddress')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{getTranslation(language, 'phoneOptional')}</label>
              <input
                type="text"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                placeholder={getTranslation(language, 'phoneOptional')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Products Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-700">{getTranslation(language, 'productsList')}</h4>
              <button
                onClick={addProductToForm}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center text-sm"
              >
                <Plus className="mr-1" size={14} />
                {getTranslation(language, 'addProduct')}
              </button>
            </div>
            
            <div className="space-y-3">
              {formItems.map((item, index) => (
                <div key={item.id} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-600">{getTranslation(language, 'productNumber')} {index + 1}</span>
                    <button
                      onClick={() => removeProductFromForm(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateFormItem(item.id, 'name', e.target.value)}
                      placeholder={getTranslation(language, 'productName')}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateFormItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        placeholder={getTranslation(language, 'quantity')}
                        min="1"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      
                      <input
                        type="number"
                        value={item.weight}
                        onChange={(e) => updateFormItem(item.id, 'weight', parseFloat(e.target.value) || 0)}
                        placeholder={getTranslation(language, 'weight')}
                        step="any"
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {formItems.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  {getTranslation(language, 'noProductsAdded')}
                </div>
              )}
            </div>
          </div>

          {/* Save and Print Button */}
          <button
            onClick={saveAndPrintForm}
            disabled={!customerInfo.name || !customerInfo.address || formItems.length === 0}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-bold flex items-center justify-center"
          >
            <Save className="mr-2" size={16} />
            {getTranslation(language, 'saveOrder')}
          </button>
        </div>

        <div id="print-area" className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <div className="border-2 border-gray-800 p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 uppercase tracking-wide">
              {getTranslation(language, 'deliveryForm')} / {getTranslation(language, 'deliveryFormEn')}
            </h3>

            {/* Thông tin khách hàng và ngày lập */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="border-2 border-gray-400 p-4">
                <h4 className="font-bold text-lg mb-3 text-gray-800 border-b border-gray-300 pb-2">{getTranslation(language, 'customerFullName')}</h4>
                {customerInfo.name ? (
                  <div className="space-y-2">
                    <p className="text-lg font-medium">{customerInfo.name}</p>
                    <p className="text-sm text-gray-600"><strong>{getTranslation(language, 'address')}:</strong> {customerInfo.address}</p>
                    {customerInfo.phone && (
                      <p className="text-sm text-gray-600"><strong>{getTranslation(language, 'phoneShort')}:</strong> {customerInfo.phone}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">{getTranslation(language, 'pleaseSelectCustomer')}</p>
                )}
              </div>
              
              <div className="border-2 border-gray-400 p-4">
                <h4 className="font-bold text-lg mb-3 text-gray-800 border-b border-gray-300 pb-2">{getTranslation(language, 'dateCreated')}</h4>
                <p className="text-lg">
                  {new Date().toLocaleDateString(language === 'vi' ? 'vi-VN' : 'zh-CN')}
                </p>
              </div>
            </div>

            {/* Bảng sản phẩm */}
            <div className="border-2 border-gray-400">
              <h4 className="font-bold text-lg p-4 text-gray-800 border-b-2 border-gray-400 bg-gray-100">{getTranslation(language, 'productListTitle')}</h4>
              <table className="w-full border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border-r border-gray-400 p-3 font-bold text-gray-800">{getTranslation(language, 'stt')}</th>
                    <th className="border-r border-gray-400 p-3 font-bold text-gray-800">{getTranslation(language, 'formProducts')}</th>
                    <th className="border-r border-gray-400 p-3 font-bold text-gray-800">{getTranslation(language, 'quantityTable')}</th>
                    <th className="border-r border-gray-400 p-3 font-bold text-gray-800">{getTranslation(language, 'unitWeightTable')}</th>
                    <th className="p-3 font-bold text-gray-800">{getTranslation(language, 'formTotalWeight')}</th>
                  </tr>
                </thead>
                <tbody>
                  {formItems.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-300">
                      <td className="border-r border-gray-400 p-3 text-center font-medium">{index + 1}</td>
                      <td className="border-r border-gray-400 p-3">{item.name || '-'}</td>
                      <td className="border-r border-gray-400 p-3 text-center">{item.quantity}</td>
                      <td className="border-r border-gray-400 p-3 text-center">{item.weight}</td>
                      <td className="p-3 text-center font-medium">
                        {(item.quantity * item.weight).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {formItems.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center p-8 text-gray-500 italic">
                        {getTranslation(language, 'noProducts')}
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan={2} className="border-r border-gray-400 p-4 text-right text-lg">
                      <strong>{getTranslation(language, 'totalCaps')}:</strong>
                    </td>
                    <td className="border-r border-gray-400 p-4 text-center text-lg">
                      <strong>{totalQuantity}</strong>
                    </td>
                    <td className="border-r border-gray-400 p-4"></td>
                    <td className="p-4 text-center text-lg">
                      <strong>{totalWeight.toFixed(2)} KG</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            {/* Chữ ký */}
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="text-center">
                <p className="font-bold mb-4">{getTranslation(language, 'sender')}</p>
                <p className="text-sm text-gray-600">{getTranslation(language, 'signaturePlaceholder')}</p>
              </div>
              <div className="text-center">
                <p className="font-bold mb-4">{getTranslation(language, 'receiver')}</p>
                <p className="text-sm text-gray-600">{getTranslation(language, 'signaturePlaceholder')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewForm;
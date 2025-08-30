import React from 'react';
import { Download, Upload, AlertTriangle, Shield, FileText, Trash2, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import { ShippingForm } from '../types';
import { Language, getTranslation } from '../utils/translations';

interface SettingsBackupProps {
  forms: ShippingForm[];
  onDataImport: (data: { forms: ShippingForm[] }) => void;
  onDataClear: () => void;
  language: Language;
}

const SettingsBackup: React.FC<SettingsBackupProps> = ({
  forms,
  onDataImport,
  onDataClear,
  language,
}) => {
  const exportData = () => {
    const dataToExport = {
      forms,
      exportDate: new Date().toISOString(),
      version: '1.0.0',
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `packsheet_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    alert(getTranslation(language, 'exportSuccess'));
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Headers giống hệt bảng lịch sử đơn hàng
    const headers = [
      getTranslation(language, 'codeColumn'),
      getTranslation(language, 'dateColumn'),
      getTranslation(language, 'customerColumn'),
      getTranslation(language, 'quantityColumn'),
      getTranslation(language, 'weightColumn'),
      getTranslation(language, 'totalWeightColumn'),
      getTranslation(language, 'phoneColumn'),
      getTranslation(language, 'addressColumn')
    ];

    const dataRows = forms.map(form => [
      `#${form.id.toString().slice(-6)}`,
      new Date(form.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'zh-CN'),
      form.customer.name,
      form.totalQuantity,
      form.items.map(item => `${item.name}: ${item.quantity} x ${item.weight}kg = ${(item.quantity * item.weight).toFixed(2)}kg`).join('\n'),
      form.totalWeight.toFixed(2) + 'kg',
      form.customer.phone || '-',
      form.customer.address
    ]);
    
    // Tạo worksheet với tất cả data
    const allData = [headers, ...dataRows];
    const worksheet = XLSX.utils.aoa_to_sheet(allData);

    // Set column widths giống bảng web
    worksheet['!cols'] = [
      { width: 15 }, // Mã số
      { width: 18 }, // Ngày tạo  
      { width: 25 }, // Khách hàng
      { width: 12 }, // Số lượng
      { width: 45 }, // Trọng lượng (chi tiết)
      { width: 18 }, // Tổng trọng lượng
      { width: 18 }, // Điện thoại
      { width: 30 }  // Địa chỉ
    ];

    // Style tất cả các ô - header và data
    const totalRows = allData.length;
    const totalCols = headers.length;
    
    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < totalCols; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
        if (!worksheet[cellRef]) continue;
        
        // Style chung cho tất cả ô - căn giữa
        const baseStyle = {
          alignment: {
            horizontal: "center",
            vertical: "center",
            wrapText: true
          },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } }
          }
        };
        
        if (row === 0) {
          // Header row - màu xanh lá với chữ trắng đậm
          worksheet[cellRef].s = {
            ...baseStyle,
            fill: {
              patternType: "solid",
              fgColor: { rgb: "22C55E" }
            },
            font: {
              bold: true,
              color: { rgb: "FFFFFF" },
              size: 14,
              name: "Arial"
            },
            border: {
              top: { style: "medium", color: { rgb: "000000" } },
              bottom: { style: "medium", color: { rgb: "000000" } },
              left: { style: "medium", color: { rgb: "000000" } },
              right: { style: "medium", color: { rgb: "000000" } }
            }
          };
        } else {
          // Data rows
          worksheet[cellRef].s = {
            ...baseStyle,
            font: {
              size: 12,
              name: "Arial",
              // Cột tổng trọng lượng (cột 5) màu xanh đậm
              ...(col === 5 ? { bold: true, color: { rgb: "2563EB" } } : {})
            }
          };
        }
      }
    }
    
    XLSX.utils.book_append_sheet(workbook, worksheet, language === 'vi' ? 'Lịch Sử Đơn Hàng' : '订单历史');

    // Tải file Excel
    const fileName = `packsheet_data_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    alert(getTranslation(language, 'excelExportSuccess'));
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        if (confirm(getTranslation(language, 'confirmOverwrite'))) {
          onDataImport({
            forms: importedData.forms || [],
          });
          alert(getTranslation(language, 'restoreSuccess'));
        }
      } catch {
        alert(getTranslation(language, 'invalidFile'));
      }
    };
    fileReader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  };

  const deleteAllData = () => {
    const confirmation = prompt(getTranslation(language, 'deleteConfirmation'));
    
    if (confirmation === 'DELETE') {
      onDataClear();
      alert(getTranslation(language, 'deleteSuccess'));
    } else {
      alert(getTranslation(language, 'deleteCancelled'));
    }
  };

  const totalItems = forms.length;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{getTranslation(language, 'settingsTitle')}</h2>
      
      {/* Data Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="font-bold text-lg mb-4 flex items-center">
          <FileText className="mr-2 text-blue-500" size={20} />
          {getTranslation(language, 'dataOverview')}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-purple-600">{forms.length}</p>
            <p className="text-sm text-gray-600">{getTranslation(language, 'formsCount')}</p>
          </div>
        </div>
      </div>

      {/* Data Backup */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="font-bold text-lg mb-4 flex items-center text-green-600">
          <Shield className="mr-2" size={20} />
          {getTranslation(language, 'dataBackup')}
        </h3>
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
          <p className="text-sm text-green-800 mb-2">
            <strong>{getTranslation(language, 'backupRecommendation')}</strong>
          </p>
          <p className="text-sm text-gray-700">
            {getTranslation(language, 'backupDescription')}
            {totalItems} {getTranslation(language, 'itemsWillBeBackedUp')}
          </p>
        </div>
        <button
          onClick={exportData}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center"
        >
          <Download className="mr-2" size={16} />
          {getTranslation(language, 'downloadBackup')}
        </button>
        <button
          onClick={exportToExcel}
          className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium flex items-center mt-3"
        >
          <FileSpreadsheet className="mr-2" size={16} />
          {getTranslation(language, 'downloadExcel')}
        </button>
      </div>

      {/* Excel Export */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="font-bold text-lg mb-4 flex items-center text-emerald-600">
          <FileSpreadsheet className="mr-2" size={20} />
          {getTranslation(language, 'excelExportTitle')}
        </h3>
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg mb-4">
          <p className="text-sm text-emerald-800 mb-2">
            <strong>{getTranslation(language, 'excelDescription')}</strong>
          </p>
        </div>
        <button
          onClick={exportToExcel}
          className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium flex items-center"
        >
          <FileSpreadsheet className="mr-2" size={16} />
          {getTranslation(language, 'downloadExcel')}
        </button>
      </div>

      {/* Data Restore */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="font-bold text-lg mb-4 flex items-center text-blue-600">
          <Upload className="mr-2" size={20} />
          {getTranslation(language, 'dataRestore')}
        </h3>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <AlertTriangle className="mr-2 text-yellow-600 flex-shrink-0 mt-0.5" size={16} />
            <div>
              <p className="text-sm text-yellow-800 font-medium mb-1">{getTranslation(language, 'importantNote')}</p>
              <p className="text-sm text-gray-700">
                {getTranslation(language, 'restoreDescription')}
                <strong className="text-red-600"> {getTranslation(language, 'overwriteWarning')}</strong>
              </p>
            </div>
          </div>
        </div>
        <input
          type="file"
          onChange={importData}
          accept=".json"
          className="block w-full text-sm text-gray-500 
                    file:mr-4 file:py-2 file:px-4 
                    file:rounded-lg file:border-0 
                    file:text-sm file:font-semibold 
                    file:bg-blue-50 file:text-blue-700 
                    hover:file:bg-blue-100 
                    file:cursor-pointer cursor-pointer"
        />
      </div>

      {/* Danger Zone */}
      <div className="bg-white p-6 rounded-lg shadow-md border-2 border-red-200">
        <h3 className="font-bold text-lg mb-4 flex items-center text-red-600">
          <AlertTriangle className="mr-2" size={20} />
          {getTranslation(language, 'dangerZone')}
        </h3>
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
          <p className="text-sm text-red-800 font-medium mb-2">⚠️ {getTranslation(language, 'cannotUndo')}</p>
          <p className="text-sm text-gray-700">
            {getTranslation(language, 'deleteAllDescription')}
          </p>
        </div>
        <button
          onClick={deleteAllData}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center"
        >
          <Trash2 className="mr-2" size={16} />
          {getTranslation(language, 'deleteAllData')}
        </button>
      </div>
    </div>
  );
};

export default SettingsBackup;
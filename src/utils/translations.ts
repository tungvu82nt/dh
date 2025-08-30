export type Language = 'vi' | 'zh';

export const translations = {
  vi: {
    // Navigation
    appName: 'PackSheet Lite',
    appDescription: 'Tạo phiếu gửi hàng tức thì',
    newForm: 'Tạo Đơn Hàng',
    formsHistory: 'Lịch Sử Đơn Hàng',

    settings: 'Cài Đặt & Sao Lưu',
    dataStoredLocally: 'Dữ liệu lưu trên trình duyệt',
    rememberBackup: 'Lưu ý: Hãy sao lưu thường xuyên!',

    // Welcome Modal
    welcomeTitle: 'Chào mừng đến với PackSheet Lite!',
    welcomeSubtitle: 'Tạo phiếu gửi hàng chuyên nghiệp chỉ trong vài giây',
    dataSafe: 'Dữ liệu an toàn',
    dataSafeDesc: 'Lưu trực tiếp trên trình duyệt của bạn',
    noRegistration: 'Không cần đăng ký',
    noRegistrationDesc: 'Bắt đầu sử dụng ngay lập tức',
    tipStart: 'Hướng dẫn: Hãy bắt đầu bằng cách nhập thông tin khách hàng và sản phẩm để tạo phiếu gửi hàng đầu tiên!',
    startUsing: 'Bắt Đầu Sử Dụng',

    // New Form - Basic Info
    newFormTitle: 'Tạo Đơn Hàng Mới',
    shippingInfo: 'Thông Tin Gửi Hàng',
    customer: 'Khách hàng',
    customerName: 'Tên khách hàng',
    customerFullName: 'HỌ TÊN KHÁCH HÀNG',
    address: 'Địa chỉ',
    customerAddress: 'Địa chỉ',
    phone: 'Số điện thoại',
    phoneShort: 'SĐT',
    phoneOptional: 'Số điện thoại (tùy chọn)',
    dateCreated: 'NGÀY LẬP',
    pleaseSelectCustomer: 'Vui lòng chọn khách hàng...',

    // New Form - Products Section
    productsList: 'Danh sách sản phẩm',

    // New Form - Products
    addProduct: 'Thêm Sản Phẩm',
    productNumber: 'Sản phẩm số',
    productName: 'Tên sản phẩm',
    quantity: 'Số Lượng',
    unitWeight: 'Đơn Vị (kilogram)',
    totalWeight: 'Tổng Trọng Lượng (kilogram)',
    delete: 'Xóa',
    total: 'Tổng cộng',
    totalCaps: 'TỔNG CỘNG',
    noProducts: 'Chưa có sản phẩm nào được thêm vào đơn hàng',
    noProductsAdded: 'Chưa có sản phẩm nào. Nhấn "Thêm sản phẩm" để bắt đầu.',
    selectCustomerAndProducts: 'Vui lòng chọn khách hàng và thêm ít nhất 1 sản phẩm.',

    // New Form - Actions
    saveOrder: 'Lưu Đơn Hàng',
    orderSavedSuccess: '✅ Đơn hàng đã được lưu thành công!',

    // New Form - Document
    deliveryForm: 'PHIẾU GỬI HÀNG',
    deliveryFormEn: 'PHIẾU GỬI HÀNG',

    // Form Table Headers
    stt: 'Thứ tự',
    productNameTable: 'TÊN SẢN PHẨM',
    quantityTable: 'SỐ LƯỢNG',
    unitWeightTable: 'TRỌNG LƯỢNG ĐƠN VỊ (KILOGRAM)',
    totalWeightTable: 'TỔNG TRỌNG LƯỢNG (KILOGRAM)',
    productListTitle: 'DANH SÁCH SẢN PHẨM',
    formProducts: 'Sản phẩm',
    formTotalWeight: 'Tổng trọng lượng',
    
    // Signature Section
    sender: 'NGƯỜI GỬI',
    receiver: 'NGƯỜI NHẬN',
    signaturePlaceholder: '(Ký và ghi rõ họ tên)',

    // Forms History - Page
    formsHistoryTitle: 'Lịch Sử Đơn Hàng',
    noFormsYet: 'Chưa có đơn hàng nào được lưu.',
    createFirstForm: 'Hãy tạo đơn hàng đầu tiên của bạn!',
    confirmDeleteForm: 'Bạn có muốn xóa đơn hàng này khỏi lịch sử?',

    // Forms History - Table Columns
    codeColumn: 'Mã số',
    dateColumn: 'Ngày tạo',
    customerColumn: 'Khách hàng',
    quantityColumn: 'Số lượng',
    weightColumn: 'Trọng lượng',
    totalWeightColumn: 'Tổng trọng lượng',
    phoneColumn: 'Điện thoại',
    addressColumn: 'Địa chỉ',



    // Settings & Backup - Overview
    settingsTitle: 'Cài Đặt & Sao Lưu Dữ Liệu',
    dataOverview: 'Tổng Quan Dữ Liệu',
    formsCount: 'Đơn hàng đã tạo',

    // Settings & Backup - Backup
    dataBackup: 'Sao Lưu Dữ Liệu',
    backupRecommendation: 'Khuyến nghị: Hãy sao lưu dữ liệu thường xuyên để tránh mất mát!',
    backupDescription: 'Tải xuống toàn bộ dữ liệu đơn hàng vào một file .json an toàn trên máy tính của bạn.',
    itemsWillBeBackedUp: 'mục dữ liệu sẽ được sao lưu.',
    downloadBackup: 'Tải Xuống Bản Sao Lưu',

    // Settings & Backup - Export
    downloadExcel: 'Tải Xuống File Bảng Tính',
    excelExportTitle: 'Xuất Dữ Liệu Bảng Tính',
    excelDescription: 'Tải xuống tất cả dữ liệu dưới dạng file bảng tính (.xlsx) để dễ dàng xem và phân tích trong các phần mềm bảng tính như Excel hoặc Google Sheets.',

    // Settings & Backup - Restore
    dataRestore: 'Phục Hồi Dữ Liệu',
    importantNote: 'Lưu ý quan trọng:',
    restoreDescription: 'Tải lên file .json đã sao lưu trước đó để khôi phục.',
    overwriteWarning: 'Thao tác này sẽ ghi đè hoàn toàn dữ liệu hiện tại.',
    dangerZone: 'Khu Vực Nguy Hiểm',
    cannotUndo: 'Thao tác không thể hoàn tác!',
    deleteAllDescription: 'Xóa toàn bộ dữ liệu khỏi trình duyệt này bao gồm tất cả sản phẩm, khách hàng và lịch sử đơn hàng. Hãy chắc chắn bạn đã sao lưu dữ liệu trước khi thực hiện.',
    deleteAllData: 'Xóa Sạch Toàn Bộ Dữ Liệu',
    exportSuccess: '✅ Đã xuất dữ liệu thành công! File sao lưu đã được tải về.',
    excelExportSuccess: '✅ Đã xuất file bảng tính thành công! File đã được tải về.',
    confirmOverwrite: '⚠️ Bạn có chắc muốn ghi đè dữ liệu hiện tại bằng dữ liệu từ file sao lưu? Thao tác này không thể hoàn tác.',
    restoreSuccess: '✅ Đã phục hồi dữ liệu thành công!',
    invalidFile: '❌ File không hợp lệ hoặc bị lỗi. Vui lòng kiểm tra lại.',
    deleteConfirmation: "⚠️ CẢNH BÁO: Đây là thao tác cực kỳ nguy hiểm và không thể hoàn tác!\n\nĐể xác nhận, vui lòng gõ chính xác từ 'DELETE' vào ô bên dưới:",
    deleteSuccess: '🗑️ Đã xóa toàn bộ dữ liệu.',
    deleteCancelled: '❌ Thao tác đã được hủy bỏ.',

    // Common
    kg: 'kilogram',
  },
  zh: {
    // Navigation
    appName: 'PackSheet Lite',
    appDescription: '即时创建发货单',
    newForm: '创建订单',
    formsHistory: '订单历史',

    settings: '设置与备份',
    dataStoredLocally: '数据存储在浏览器中',
    rememberBackup: '重要提醒：请定期备份数据！',

    // Welcome Modal
    welcomeTitle: '欢迎使用 PackSheet Lite！',
    welcomeSubtitle: '几秒钟内创建专业发货单',
    dataSafe: '数据安全',
    dataSafeDesc: '直接存储在您的浏览器中',
    noRegistration: '无需注册',
    noRegistrationDesc: '立即开始使用',
    tipStart: '提示：首先输入客户和产品信息来创建您的第一个发货单！',
    startUsing: '开始使用',

    // New Form - Basic Info
    newFormTitle: '创建新订单',
    shippingInfo: '发货信息',
    customer: '客户',
    customerName: '客户姓名',
    customerFullName: '客户姓名',
    address: '地址',
    customerAddress: '地址',
    phone: '电话号码',
    phoneShort: '电话',
    phoneOptional: '电话号码（可选）',
    dateCreated: '创建日期',
    pleaseSelectCustomer: '请选择客户...',

    // New Form - Products Section
    productsList: '产品列表',

    // New Form - Actions
    saveOrder: '保存订单',
    orderSavedSuccess: '✅ 订单保存成功！',

    // New Form - Document
    deliveryForm: '发货单',
    deliveryFormEn: 'DELIVERY FORM',

    // New Form - Products
    addProduct: '添加产品',
    productNumber: '产品 #',
    productName: '产品名称',
    quantity: '数量',
    unitWeight: '单位重量 (kilogram)',
    totalWeight: '总重量 (kilogram)',
    delete: '删除',
    total: '总计',
    totalCaps: '总计',
    noProducts: '尚未添加任何产品到订单',
    noProductsAdded: '还没有产品。点击"添加产品"开始。',
    selectCustomerAndProducts: '请选择客户并至少添加1个产品。',

    // Form Table Headers
    stt: '序号',
    productNameTable: '产品名称',
    quantityTable: '数量',
    unitWeightTable: '单位重量 (KG)',
    totalWeightTable: '总重量 (KG)',
    productListTitle: '产品清单',
    formProducts: '产品列表',
    formTotalWeight: '总重量',

    // Signature Section
    sender: '发货人',
    receiver: '收货人',
    signaturePlaceholder: '(签名并写清姓名)',



    // Forms History
    formsHistoryTitle: '订单历史',
    noFormsYet: '还没有保存的订单。',
    createFirstForm: '创建您的第一个订单！',
    confirmDeleteForm: '您要从历史记录中删除此订单吗？',
    
    // Table Columns  
    codeColumn: '编码',
    dateColumn: '创建日期', 
    customerColumn: '客户',
    quantityColumn: '数量',
    weightColumn: '重量',
    totalWeightColumn: '总重量',
    phoneColumn: '电话',
    addressColumn: '地址',



    // Settings & Backup
    settingsTitle: '设置与数据备份',
    dataOverview: '数据概览',

    formsCount: '已创建订单',
    dataBackup: '数据备份',
    backupRecommendation: '建议：定期备份数据以避免丢失！',
    backupDescription: '将所有订单数据下载到您计算机上的安全 .json 文件中。',
    itemsWillBeBackedUp: '项目将被备份。',
    downloadBackup: '下载备份文件',
    downloadExcel: '下载 Excel 文件',
    excelExportTitle: '导出 Excel 数据',
    excelDescription: '将所有数据下载为 Excel 文件 (.xlsx)，便于在 Microsoft Excel 或 Google Sheets 中查看和分析。',
    dataRestore: '数据恢复',
    importantNote: '重要提示：',
    restoreDescription: '上传之前备份的 .json 文件进行恢复。',
    overwriteWarning: '此操作将完全覆盖当前数据。',
    dangerZone: '危险区域',
    cannotUndo: '操作无法撤销！',
    deleteAllDescription: '从此浏览器中删除所有数据，包括所有产品、客户和订单历史。请确保在执行前已备份数据。',
    deleteAllData: '清除所有数据',
    exportSuccess: '✅ 数据导出成功！备份文件已下载。',
    excelExportSuccess: '✅ Excel 文件导出成功！文件已下载。',
    confirmOverwrite: '⚠️ 您确定要用备份文件中的数据覆盖当前数据吗？此操作无法撤销。',
    restoreSuccess: '✅ 数据恢复成功！',
    invalidFile: '❌ 文件无效或损坏。请检查后重试。',
    deleteConfirmation: "⚠️ 警告：这是极其危险的操作，无法撤销！\n\n要确认，请在下面的框中准确输入 'DELETE'：",
    deleteSuccess: '🗑️ 已删除所有数据。',
    deleteCancelled: '❌ 操作已取消。',

    // Common
    kg: 'kilogram',
  }
};

export function getTranslation(language: Language, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[language];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}
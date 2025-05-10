$w.onReady(function () {
  const elementId = '#ziweiChart';
  if ($w(elementId).type === '$w.CustomElement') {
    $w(elementId).postMessage({ trigger: 'parseQuery' });
  } else {
    console.error("自訂元件未找到或類型錯誤:", elementId);
  }
});

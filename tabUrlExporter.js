// デフォルト設定
const DEFAULT_TEMPLATE = '[%%title%%] %%URL%%';
const DEFAULT_DELIMITER = '\n';

// テキストエリアの自動リサイズ機能
const autoResizeTextarea = (textarea) => {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
};

// localStorageから設定を読み込む
const loadSettings = () => {
  const savedTemplate = localStorage.getItem('tabInfo_template');
  const savedDelimiter = localStorage.getItem('tabInfo_delimiter');
  
  const template = savedTemplate || DEFAULT_TEMPLATE;
  const delimiter = savedDelimiter !== null ? savedDelimiter : DEFAULT_DELIMITER;
  
  // 特殊文字のエスケープ処理（\n などを実際の改行に変換）
  const processedDelimiter = delimiter.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  
  return { template, delimiter: processedDelimiter };
};

// 設定をlocalStorageに保存
const saveSettings = () => {
  const template = document.querySelector('#template').value;
  const delimiter = document.querySelector('#delimiter').value;
  
  if (template.trim()) {
    localStorage.setItem('tabInfo_template', template);
  }
  if (delimiter !== null) {
    localStorage.setItem('tabInfo_delimiter', delimiter);
  }
  
  // 設定保存後に再生成
  run();
};

// 設定をリセット
const resetSettings = () => {
  localStorage.removeItem('tabInfo_template');
  localStorage.removeItem('tabInfo_delimiter');
  
  const templateEl = document.querySelector('#template');
  templateEl.value = DEFAULT_TEMPLATE;
  autoResizeTextarea(templateEl);
  
  const delimiterEl = document.querySelector('#delimiter');
  delimiterEl.value = DEFAULT_DELIMITER;
  
  run();
};

// 設定をUIに反映
const applySettingsToUI = () => {
  const { template, delimiter } = loadSettings();
  // テンプレートはtextareaなので、改行をそのまま表示
  const templateEl = document.querySelector('#template');
  templateEl.value = template;
  autoResizeTextarea(templateEl);
  
  // 区切り文字はinputなので、表示用に改行を \n に変換
  const displayDelimiter = delimiter.replace(/\n/g, '\\n').replace(/\t/g, '\\t');
  const delimiterEl = document.querySelector('#delimiter');
  delimiterEl.value = displayDelimiter;
};

const createTextFromTemplate = (title, url, template) => {
  let txt = template;

  txt = txt.replace(/%%title%%/g, title);
  txt = txt.replace(/%%URL%%/g, url);
  return txt;
}

const run = () => {
  //現在のウインドウのタブをすべて取得
  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
    let txt = '';
    const { template, delimiter } = loadSettings();

    document.querySelector('#numOfTabs').value = tabs.length;

    tabs.forEach((tab, i) => {
      if(i != 0) txt += delimiter;  //最初は区切り文字不要
      console.log(tab.title + " " + tab.url);
      txt += createTextFromTemplate(tab.title, tab.url, template);
    });

    const txtEl = document.querySelector('#txt');
    txtEl.value = txt;
    autoResizeTextarea(txtEl);
  });
}

const copy = () => {
  const copyText = document.querySelector('#txt');
  copyText.select();
  copyText.setSelectionRange(0, 99999); // モバイル対応
  
  try {
    // 最新のClipboard APIを試す
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(copyText.value).then(() => {
        // コピー成功時のフィードバック（オプション）
        console.log('コピーしました');
      }).catch(err => {
        // フォールバック: 従来の方法
        document.execCommand('copy');
      });
    } else {
      // フォールバック: 従来の方法
      document.execCommand('copy');
    }
  } catch (err) {
    console.error('コピーに失敗しました:', err);
  }
}

// テンプレートや区切り文字が変更されたときに自動で再生成
const setupAutoRegenerate = () => {
  const templateInput = document.querySelector('#template');
  const delimiterInput = document.querySelector('#delimiter');
  
  templateInput.addEventListener('input', () => {
    autoResizeTextarea(templateInput);
    run();
  });
  
  delimiterInput.addEventListener('input', () => {
    run();
  });
};

// テキストエリアの自動リサイズを設定
const setupTextareaAutoResize = () => {
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    textarea.addEventListener('input', () => {
      autoResizeTextarea(textarea);
    });
    // 初期リサイズ
    autoResizeTextarea(textarea);
  });
};

window.addEventListener('load', () => {
  // 設定をUIに反映
  applySettingsToUI();
  
  // テキストエリアの自動リサイズを設定
  setupTextareaAutoResize();
  
  // 初期実行
  run();
  
  // イベントリスナー設定
  document.querySelector("#copy").addEventListener("click", copy);
  document.querySelector("#saveSettings").addEventListener("click", saveSettings);
  document.querySelector("#resetSettings").addEventListener("click", resetSettings);
  
  // 自動再生成の設定
  setupAutoRegenerate();
})


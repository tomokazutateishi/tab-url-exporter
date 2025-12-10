# プライバシーポリシーURL作成手順

## 方法1: GitHub Gist（最も簡単・推奨）

### 手順
1. https://gist.github.com/ にアクセス
2. GitHubアカウントでログイン（アカウントがない場合は作成）
3. ファイル名を `privacy-policy.html` に設定
4. `privacy-policy.html` の内容をすべてコピーして貼り付け
5. 「Create public gist」ボタンをクリック
6. 表示されたURLをコピー（例: `https://gist.github.com/username/abc123def456...`）
7. URLの末尾に `/raw/privacy-policy.html` を追加

### 完成したURLの例
```
https://gist.github.com/username/abc123def456/raw/privacy-policy.html
```

このURLをChromeウェブストア登録フォームに入力してください。

---

## 方法2: GitHub Pages（より正式）

### 手順
1. GitHubアカウントを作成（https://github.com/）
2. 新しいリポジトリを作成（例: `tab-url-exporter`）
3. `privacy-policy.html` をリポジトリにアップロード
4. リポジトリの Settings → Pages を開く
5. Source を「main」ブランチに設定して保存
6. 数分後に以下のURLでアクセス可能:
   ```
   https://[あなたのユーザー名].github.io/tab-url-exporter/privacy-policy.html
   ```

---

## 方法3: Netlify Drop（アカウント不要）

### 手順
1. https://app.netlify.com/drop にアクセス
2. `privacy-policy.html` をドラッグ&ドロップ
3. 自動的にURLが生成される（例: `https://random-name-123.netlify.app/privacy-policy.html`）
4. このURLをコピーして使用

---

## 方法4: Vercel（アカウント不要・簡単）

### 手順
1. https://vercel.com/ にアクセス
2. 「Deploy」をクリック
3. GitHubアカウントでログイン（または新規作成）
4. 新しいリポジトリを作成して `privacy-policy.html` をアップロード
5. 自動的にURLが生成される

---

## 推奨順位

1. **GitHub Gist** - 最も簡単、5分で完了
2. **Netlify Drop** - アカウント不要、即座にURL取得
3. **GitHub Pages** - より正式、長期的に使用可能
4. **Vercel** - 簡単、無料

どの方法でも、生成されたURLをChromeウェブストア登録フォームの「プライバシーポリシーのURL」欄に入力してください。


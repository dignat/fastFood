************************************************************
      Star WebPRNT SDK  -  Ver 1.2.1
         readme_jp.txt                  スター精密（株）
************************************************************

 1. 概要
 2. Ver 1.2.1 についての変更点
 3. 内容
 4. 適用
 5. 制約事項
 6. 著作権
 7. 変更履歴


==========
 1. 概要
==========

  本ソフトウェアは、PC、タブレット等多様なデバイスからWebブラウザーを通して印刷
  を行う、マルチプラットフォームを実現します。
  プリンターの制御は、このSDKにパッケージされているJavaScriptをHTMLファイルに埋
  め込むだけで行え、Webプログラミングを行うのと同等の知識でPOSプリンターからの
  レシート印刷が可能となります。また、プリンターを制御するためのドライバーやプ
  ラグインをインストールする必要もありません。

  詳細な説明は、Users Manual(HTMLファイル)を参照ください。


================================
 2. Ver 1.2.1 についての変更点
================================

  [SDK]
   - ブラックマーク用紙のデフォルト設定を修正
     WebPRNT BrowserにてMSW設定を利用して
     ブラックマーク用紙を使用できるように対応

  [User's Manual]
   - ブラックマークに関するAPIのリファレンスを修正
   - StarPRNTモードに関するリファレンスを追加

==========
 3. 内容
==========

  StarWebPRNT_WebContents_V1.2.1
  |
  | Readme_En.txt                       // リリースノート(英語)
  | Readme_Jp.txt                       // リリースノート(日本語)
  | SoftwareLicenseAgreement.pdf        // ソフトウエア使用許諾書(英語)
  | SoftwareLicenseAgreement_jp.pdf     // ソフトウエア使用許諾書(日本語)
  |
  +- UsersManual
  |  |  jp                              // 説明資料(日本語)
  |  +- en                              // 説明資料(英語)
  |
  +- Sample                             // WebPRNT用サンプルプログラム


=============
 4. 適用
=============
  ■ 対象プリンタモデル
   ◇ プリンタモデル
       SM-S210I         (F/W Ver1.0以上)    (*1)
       SM-S220I         (F/W Ver2.0以上)    (*1)
       SM-S230I         (F/W Ver1.0以上)    (*1)
       SM-T300I         (F/W Ver2.4以上)    (*1)
       SM-T400I         (F/W Ver2.4以上)    (*1)
       SM-L200          (F/W Ver1.0以上)    (*1)

       FVP10            (Ethernet利用時: F/W Ver1.5以上, Bluetooth利用時: F/W Ver2.0以上)　(*1)
       TSP650II         (Ethernet利用時: F/W Ver1.2以上, Bluetooth利用時: F/W Ver1.0以上)　(*1)
       TSP700II         (Ethernet利用時: F/W Ver4.1以上, Bluetooth利用時: F/W Ver4.0以上)　(*1)
       TSP800II         (Ethernet利用時: F/W Ver1.6以上, Bluetooth利用時: F/W Ver2.0以上)　(*1)
       mPOP             (F/W Ver1.0以上)    (*1)

       SP700            (Ethernet利用時: F/W Ver3.0以上, Bluetooth利用時: F/W Ver4.0以上)　(*2)

       ASR10            (Linux OS Ver1.6以降)

    <Bluetoothをご使用の場合>
      印刷するには、Star WebPRNT Browserが必要です。
      対応しているデバイスは注記の通りです。

        *1 iOSおよびAndroidデバイスにおいてサポートされています。
　    　*2 iOSデバイスにおいてサポートされています。

  ◇ 対応インターフェースカード
       Ethernet:  IFBD-HE07X/HE08X/BE07X    (Ver3.1.0以上)
       Bluetooth: IFBD-HB03/HB04            (Ver1.0.0以上)
                  IFBD-HB05/HB06/BB05       (Ver1.0.0以上)


=============
 5. 制約事項
=============
  
  特にありません。

===========
 6. 著作権
===========

  スター精密（株）Copyright 2014-2016


=============
 7. 更新履歴
=============

 Ver 1.2.1
  2016/02/08 : [SDK]
                - ブラックマーク用紙のデフォルト設定を修正
                  WebPRNT BrowserにてMSW設定を利用して
                  ブラックマーク用紙を使用できるように対応

               [User's Manual]
                - ブラックマークに関するAPIのリファレンスを修正
                - StarPRNTモードに関するリファレンスを追加

 Ver 1.2.0   
  2015/11/06 : [SDK]
                - ブラックマーク用紙対応

               [User's Manual]
                - ブラックマークに関するAPIのリファレンスを追加

 Ver 1.1.0   
  2015/02/20 : [SDK]
                - コンテンツの表示サイズを、閲覧デバイスの画面サイズに合わせて
                  自動変更する機能追加

                - Androidデバイスにおける表示に関する不具合を修正

 Ver 1.0.0 
  2014/12/12 : [SDK]
                - iOS版Star WebPRNT Browserとの組合せ利用時に発生する事案に対す
                  るサンプルコード追加
                    事案1:印刷内容が全て表示される前に印刷ボタンを押すと、その
                          時点で表示された内容のみが印刷される
                    事案2:印刷ボタンを連続して押下した場合に、iOS版Star WebPRNT
                          Browserが強制終了することがある
                - トップページの追加
                - Star WebPRNT Browser iOSの使い方マニュアルを追加
                - 2inchレシート紙をサポート
                - 全ての表示が完了してからwindows.onLoad関数によって表示させる
                  機能を追加
                - SendMessage()関数がコールと同時に、最上段に「Now Printing…」
                  を表示したHTMLレイヤーを重ね、ページ全体をクリック不可として
                  印刷ボタンの2度押しを防ぐ機能を追加

               [User's Manual]
                - Star WebPRNT Browser iOSの使い方を追加

 Ver 0.3.0
  2014/01/15 : [SDK]
                - UTF-8対応

               [User's Manual]
                - ドットプリンタ対応記載追加
                - UTF-8対応記載追加
                - "システム構成例 Star POSプリンター"にASR10記載追加
 Ver 0.2.0
  2013/11/07 : [SDK]
                - HTMLファイル内にてStarWebPRNTエンドポイントURLのデフォルト誤
                  記訂正

               [User's Manual]
                - ASR10記載追加

 Ver 0.1.0 
  2013/08/26 : 初版リリース

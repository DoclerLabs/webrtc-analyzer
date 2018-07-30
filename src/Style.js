export default function() {
  return `<style>
        .webrtc-analyzer {
            position: fixed;
            width: 0px;
            height: 0px;
            top: 0px;
            left: 0px;
            z-index: 99999999;
            font-family: monaco, Consolas, "Lucida Console", monospace;
            font-size: 12px;
        }
        .webrtc-analyzer.hidden .wa-holder {
            left: 100%;
        }
        .webrtc-analyzer .wa-holder {
            position: fixed;
            z-index: 1;
            box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px;
            background-color: #1e1f22;;
            left: 70%;
            top: 0px;
            width: 30%;
            height: 100%;
            transition: left 0.2s ease-out, top 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out;
        }
        .webrtc-analyzer .wa-header {
            background-color: #1e1f22;
            position: absolute;
            width: 100%;
        }
        .webrtc-analyzer .wa-header select {
            width:100%;
            height: 35px;
            border: 0;
            border-radius: 0;
            background-color: #1e1f22;
            color: rgb(129, 162, 190);
            font-family: inherit;
            font-size: 12px;
            display: block;
            padding: 0 10px;
            box-sizing: border-box;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            cursor:pointer;
        }
        .webrtc-analyzer .wa-main {
            padding-top: 80px;
            box-sizing: border-box;
        }
        .webrtc-analyzer .wa-main,
        .webrtc-analyzer .wa-main .wa-stat {
            height: 100%;
        }
        .webrtc-analyzer .wa-stat {
            overflow: auto;
        }
        .webrtc-analyzer .wa-stat main {
            width: 100%;
            height: 100%;
        }

        .webrtc-analyzer .wa-stat table {
            width: 100%;
            table-layout: fixed;
            border-collapse:collapse;
        }

        .webrtc-analyzer .wa-stat tr:nth-child(2n) {
            background-color:#282a2d; 
            color: rgb(224, 224, 224);
        }
        
        .webrtc-analyzer .wa-stat td {
            padding: 3px 10px;
            word-wrap: break-word;
        }
        
        .webrtc-analyzer .wa-stat tr:nth-child(2n+1){
            color: rgb(129, 162, 190)
        }
        
        .webrtc-analyzer .wa-stat tr td:nth-child(2) {
            color: rgb(181, 189, 104);
        }

        .webrtc-analyzer .wa-header header,
        .webrtc-analyzer .wa-stat header {
            color: #fff;
            font-size: 14px;
            padding: 10px 20px;
            background-color: #383b40;
            margin-bottom: 6px;
        }
    </style>`;
}

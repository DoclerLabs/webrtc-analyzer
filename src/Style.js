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
        .webrtc-analyzer.hidden .box {
            left: 100%;
        }
        .webrtc-analyzer .box {
            position: fixed;
            z-index: 1;
            box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px;
            background: white;
            left: 70%;
            top: 0px;
            width: 30%;
            height: 100%;
            transition: left 0.2s ease-out, top 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out;
        }
        .webrtc-analyzer main {
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: #1e1f22;
        }

        .webrtc-analyzer table {
            width: 100%;
            table-layout: fixed;
            border-collapse:collapse;
        }

        .webrtc-analyzer tr:nth-child(2n) {
            background-color:#282a2d; 
            color: rgb(224, 224, 224);
        }
        
        .webrtc-analyzer td {
            padding: 3px 10px;
        }
        
        .webrtc-analyzer tr:nth-child(2n+1){
            color: rgb(129, 162, 190)
        }
        
        .webrtc-analyzer tr td:nth-child(2) {
            color: rgb(181, 189, 104);
        }

        .webrtc-analyzer header {
            color: #fff;
            font-size: 14px;
            padding: 10px 20px;
            background-color: #383b40;
            margin-bottom: 6px;
        }
    </style>`;
}

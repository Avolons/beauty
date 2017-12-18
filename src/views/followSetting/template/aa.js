export const aa = {
    "id": "91920123-e0ab-11e7-a153-6cae8b369de4",   //id不传表示新增
    "name": "测试方案1不不",                          //方案名称
    "departmentId": "911",                          //科室类型id
    "diseaseId": "122741",                          //疾病类型id
    "activeType": 0,                                //方案类型：0代表随访，1代表通知
    "status": 0,                                    //状态：0，启用；1，禁用
    "questionTemples": [
        {
            "questionTempleTimeRanges": [
                {
                    "templeId": "ae9e699f-e09b-11e7-a153-6cae8b369de4",//模板id
                    "type": "0",                                       //默认0
                    "beginTime": "7:00",                               //随访区间，时间段1
                    "endTime": "11:00"                                 //随访区间，时间段2
                },
                {
                    "templeId": "ae9e699f-e09b-11e7-a153-6cae8b369de4",
                    "type": "0",
                    "beginTime": "14:00",
                    "endTime": "23:00"
                }
            ],
            "questionTempleFrequency": {
                "templeId": "ae9e699f-e09b-11e7-a153-6cae8b369de4",   //模板id
                "number": 10,                                         //随访次数
                "firstday": 3,                                      //出院后第几天，第一次随访
                "intervalDays": 2                                   //间隔多少天再次随访
            },
            "questionSchemeWavs": [
                {
                    "questionId": "1a96eeaf-e096-11e7-a153-6cae8b369de4",//问题id
                    "outRptSwitchId": "",                                //超时跳转ID
                    "switchId": "",                                  //话术id，为空表示AI语音
                    "keyname": "",                                       //指标名称
                    "keyvalue": "",                                      //指标值
                    "switchText": "",                                    //话术名称
                    "switchRegexText": "",                               //判断规则
                    "nextQuestionId": "",                                //下一个问题ID
                    "questionIdXml": "",                          //xml中从1000开始的问题编号
                    "silenceWav": "",                                    //超时语音
                    "templeId": "ae9e699f-e09b-11e7-a153-6cae8b369de4",  //模板id
                    "switchTTS": "",                                     //tts
                    "switchWav": "AI语音.wav"                             //AI-语音         
                },
                {
                    "questionId": "1a96eeaf-e096-11e7-a153-6cae8b369de4",
                    "outRptSwitchId": "2",
                    "switchId": "-1",
                    "keyvalue": "",
                    "switchText": "无匹配",
                    "switchRegexText": "",
                    "nextQuestionId": "1001",
                    "questionIdXml": "1000",
                    "silenceWav": "",
                    "templeId": "ae9e699f-e09b-11e7-a153-6cae8b369de4",
                    "switchTTS": "",
                    "switchWav": "无匹配及无声\\无匹配6.wav",
                    "keyname": ""
                },
                {
                    "questionId": "1a96eeaf-e096-11e7-a153-6cae8b369de4",
                    "outRptSwitchId": "",
                    "switchId": "-2",
                    "keyvalue": "",
                    "switchText": "无声音",
                    "switchRegexText": "",
                    "nextQuestionId": "1001",
                    "questionIdXml": "1000",
                    "silenceWav": "",
                    "templeId": "ae9e699f-e09b-11e7-a153-6cae8b369de4",
                    "switchTTS": "",
                    "switchWav": "无声音声\\无声音.wav",
                    "keyname": ""
                },
                {
                    "questionId": "1a96eeaf-e096-11e7-a153-6cae8b369de4",
                    "outRptSwitchId": "",
                    "switchId": "-3",
                    "switchText": "通用处理",
                    "switchRegexText": "",
                    "nextQuestionId": "1001",
                    "questionIdXml": "1000",
                    "silenceWav": "",
                    "templeId": "ae9e699f-e09b-11e7-a153-6cae8b369de4",
                    "switchTTS": "",
                    "switchWav": "通用处理\\通用处理.wav",
                    "keyname": "",
                    "keyvalue": ""
                },
                {
                    "questionId": "1a96eeaf-e096-11e7-a153-6cae8b369de4",
                    "outRptSwitchId": "",
                    "switchId": "1",
                    "switchText": "是患者家人",
                    "switchRegexText": "(?!.*不太|.*不是|.*不)^.*差|不",
                    "nextQuestionId": "1001",
                    "questionIdXml": "1000",
                    "silenceWav": "",
                    "templeId": "ae9e699f-e09b-11e7-a153-6cae8b369de4",
                    "switchTTS": "",
                    "switchWav": "处理1\\处理1.wav",
                    "keyname": "测试指标 ",
                    "keyvalue": "正常"
                },
                {
                    "questionId": "1a96eeaf-e096-11e7-a153-6cae8b369de4",
                    "outRptSwitchId": "",
                    "switchId": "2",
                    "switchText": "无匹配的超次数跳转处理",
                    "switchRegexText": "(?!.*不太|.*不是|.*不)^.*差|不",
                    "nextQuestionId": "1001",
                    "questionIdXml": "1000",
                    "silenceWav": "",
                    "templeId": "ae9e699f-e09b-11e7-a153-6cae8b369de4",
                    "switchTTS": "",
                    "switchWav": "处理2\\处理2.wav",
                    "keyname": "测试指标 ",
                    "keyvalue": "不正常"
                }
            ]
        }
    ]
}

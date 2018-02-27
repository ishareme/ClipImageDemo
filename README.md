# JavaScript Package Template

```sh
html:
<div id="containerOrigin"></div>
<div class="upload-box">
        点我上传
    <input type="file" id="upload-btn" accept="image/*">
</div>

js:
let $result = document.getElementById('result')
    new ClipImageDemo({
        //源Dom
        originDom: '#containerOrigin',
        //or 上传按钮
        uploadBtn: '.upload-box',
        width: 400,
        height: 400,
        success(result){
            $result.style.width = result.width + 'px'
            $result.style.height = result.height + 'px'
            $result.src = result.b64
        },
        error(error){},
    })
    
```

**NOTE: rename the package name start with `@meitu/`**

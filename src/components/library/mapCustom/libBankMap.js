
    // Arrow
    L.Arrow = L.Polyline.extend({
        clone() {
          const n = new L.Arrow(this.getLatLngs(), _.clone(this.options));
          return (n._originalWeight = this._originalWeight), n;
        },
        _updatePath() {
          this._originalWeight || (this._originalWeight = this.options.weight);
          const n = this._map.getZoom() - this._map.getMinZoom(),
            i = (this._originalWeight * Math.pow(2, n)) / 1000;
          return (
            this.options.weight !== i &&
              ((this.options.weight = i), this.setStyle(this.options)),
            this._renderer._updateArrow(
              this,
              i,
              this.options.arrowFactor,
              this.options.stemFactor
            )
          );
        },
      });
      // highlight
      L.Highlight = L.Polyline.extend({
        clone() {
          const n = new L.Drawing(
            this.getLatLngs(),
            _.clone(
              Object.assign(Object.assign({}, this.options), {
                fill: !1,
              })
            )
          );
          return (n._originalWeight = this._originalWeight), n;
        },
        _updatePath() {
          this._originalWeight || (this._originalWeight = this.options.weight);
          const n = this._map.getZoom() - this._map.getMinZoom(),
            i = (this._originalWeight * Math.pow(2, n)) / 1000;
          return (
            this.options.weight !== i &&
              ((this.options.weight = i), this.setStyle(this.options)),
            this._renderer._updatePoly(this, !1)
          );
        },
      });
      // draw
      L.Drawing = L.Polyline.extend({
        clone() {
          const n = new L.Drawing(
            this.getLatLngs(),
            _.clone(
              Object.assign(Object.assign({}, this.options), {
                fill: !1,
              })
            )
          );
          return (n._originalWeight = this._originalWeight), n;
        },
        _updatePath() {
          this._originalWeight || (this._originalWeight = this.options.weight);
          const n = this._map.getZoom() - this._map.getMinZoom(),
            i = (this._originalWeight * Math.pow(2, n)) / 1000;
          return (
            this.options.weight !== i &&
              ((this.options.weight = i), this.setStyle(this.options)),
            this._renderer._updatePoly(this, !1)
          );
        },
      });
      // cloud
      L.Cloud = L.Rectangle.extend({
        clone() {
          var i;
          const A = new L.Cloud(
            this.getBounds(),
            _.clone(
              Object.assign(Object.assign({}, this.options), {
                fill: this._isHighlighted
                  ? this.options.preHighlightFill
                  : this.options.fill,
                fillColor:
                  (i = this.options.fillColor) !== null && i !== void 0
                    ? i
                    : this.options.color,
                fillOpacity: this._isHighlighted
                  ? this.options.preHighlightFillOpacity
                  : this.options.fillOpacity,
              })
            )
          );
          return (A._originalWeight = this._originalWeight), A;
        },
        setCoordinates(i) {
          this._markup.data.geometry.coordinates = i;
          const A = this.markupToBounds(this._markup.data);
          this.setBounds(A), this.editing._repositionCornerMarkers();
        },
        _updatePath() {
          this._originalWeight || (this._originalWeight = this.options.weight);
          const i = this._map.getZoom() - this._map.getMinZoom(),
            A = (this._originalWeight * Math.pow(2, i)) / 1000,
            d = (8 * Math.pow(2, i)) / 1000;
          return (
            this.options.weight !== A &&
              ((this.options.weight = A), this.setStyle(this.options)),
            this._renderer._updateCloud(this, !0, i, d)
          );
        },
      });
  
      function be(se, we) {
        let ri
        var Rt = "",
          _n,
          Zn,
          Wi,
          zr,
          Jr,
          ro;
        for (_n = 0, Wi = se.length; _n < Wi; _n++) {
          for (Jr = se[_n], Zn = 0, zr = Jr.length; Zn < zr; Zn++)
            (ro = Jr[Zn]), (Rt += (Zn ? "L" : "M") + ro.x + " " + ro.y);
          Rt += we ? ((ri) ? "z" : "x") : "";
        }
        return Rt || "M0 0";
      }
      L.extend(L.SVG.prototype, {
        _updatePoly: function (se, we) {
          this._setPath(se, be(se._rings, we));
        },
        _updateCloud(n, i, A, d) {
          return this._setPath(n, L.SVG.pointsToCloudPath(n._parts, i, A, d));
        },
        _updateArrow(n, i, A, d) {
          return this._setPath(n, L.SVG.pointsToArrowPath(n._parts, i, A, d));
        },
        _updateMeasurementLine(n, i, A, d) {
          console.log(A);
          console.log(d);
          console.log(L.SVG.pointsToMeasurementLinePath(n._parts, i, A, d));
          return this._setPath(
            n,
            L.SVG.pointsToMeasurementLinePath(n._parts, i, A, d)
          );
        },
        _updateMeasurement(n, i) {
          return this._setPath(n, L.SVG.pointsToMeasurePath(n, i));
        },
        _updateCircle(n) {
          const i = n._point,
            A = Math.max(n._radius, 1),
            d = Math.max(n._radiusY, 1) || A,
            h = "a" + A + "," + d + " 0 1,0 ",
            c = n._empty()
              ? "M0 0"
              : "M" +
                (i.x - A) +
                "," +
                i.y +
                h +
                A * 2 +
                ",0 " +
                h +
                -A * 2 +
                ",0 ";
          this._setPath(n, c);
        },
      }),
        L.extend(L.SVG, {
          rotatedPath(n, i, A, d, h) {
            let c = `M ${i} ${A}`;
            for (const a of n) {
              const [l, s, r] = Array.from(a),
                o = i + Math.cos(d) * (l - i) - Math.sin(d) * (s - A),
                u = A + Math.sin(d) * (l - i) + Math.cos(d) * (s - A);
              c += ` ${r} ${o} ${u}`;
            }
            return h && (c += " z"), c;
          },
          pointsToMeasurementLinePath(n, i, A, d) {
            const h = n[0];
            if (!h) return "M0 0";
            const c = h[0],
              a = h[1],
              l = a.x - c.x,
              s = a.y - c.y,
              r = i * A,
              o = r / d,
              u = o / 2,
              m = (r * Math.sqrt(3)) / 2,
              E = (m + o) * 2,
              f = Math.sqrt(Math.pow(l, 2) + Math.pow(s, 2)),
              p = Math.atan2(s, l);
            if (f < E) {
              const v = [
                  [c.x, c.y - r, "L"],
                  [c.x + u, c.y - r, "L"],
                  [c.x + u, c.y + r, "L"],
                  [c.x, c.y + r, "L"],
                  [c.x, c.y, "L"],
                ],
                O = [
                  [c.x - m, c.y - r / 2, "L"],
                  [c.x - m, c.y + r / 2, "L"],
                  [c.x, c.y, "L"],
                ],
                R = [
                  [c.x + f - u, c.y, "M"],
                  [c.x + f - u, c.y + r, "L"],
                  [c.x + f, c.y + r, "L"],
                  [c.x + f, c.y - r, "L"],
                  [c.x + f - u, c.y - r, "L"],
                  [c.x + f - u, c.y, "L"],
                ],
                C = [
                  [c.x + f, c.y, "M"],
                  [c.x + f + m, c.y - r / 2, "L"],
                  [c.x + f + m, c.y + r / 2, "L"],
                  [c.x + f, c.y, "L"],
                ],
                y = [...v, ...O, ...R, ...C];
              return L.SVG.rotatedPath(y, c.x, c.y, p, !0);
            }
            const T = [
              [c.x, c.y + r, "L"],
              [c.x + o / 2, c.y + r, "L"],
              [c.x + o / 2, c.y, "L"],
              [c.x + o + m, c.y + r / 2, "L"],
              [c.x + o + m, c.y + u, "L"],
              [c.x - o + f - m, c.y + u, "L"],
              [c.x - o + f - m, c.y + r / 2, "L"],
              [c.x - o / 2 + f, c.y, "L"],
              [c.x - o / 2 + f, c.y + r, "L"],
              [c.x + f, c.y + r, "L"],
              [c.x + f, c.y - r, "L"],
              [c.x - o / 2 + f, c.y - r, "L"],
              [c.x - o / 2 + f, c.y, "L"],
              [c.x - o + f - m, c.y - r / 2, "L"],
              [c.x - o + f - m, c.y - u, "L"],
              [c.x + o + m, c.y - u, "L"],
              [c.x + o + m, c.y - u, "L"],
              [c.x + o + m, c.y - r / 2, "L"],
              [c.x + o / 2, c.y, "L"],
              [c.x + o / 2, c.y - r, "L"],
              [c.x, c.y - r, "L"],
            ];
            return L.SVG.rotatedPath(T, c.x, c.y, p, !0);
          },
          pointsToMeasurePath(n, i) {
            const d = n._parts[0],
              h = d[0],
              c = d[1],
              a = c.x - h.x,
              l = c.y - h.y,
              s = i * 4,
              r = i / 2,
              o = (s * Math.sqrt(3)) / 2,
              u = Math.sqrt(Math.pow(a, 2) + Math.pow(l, 2)),
              m = Math.atan2(l, a),
              E = 0;
            if (
              (Math.abs(a) < s && Math.abs(l) < s) ||
              u < s * 2 ||
              u - s * 2 < E
            )
              return "M0 0";
            const f = [
              [h.x + o, h.y + s / 2, "L"],
              [h.x + o, h.y + r, "L"],
              [h.x + u - o, h.y + r, "L"],
              [h.x + u - o, h.y + s / 2, "L"],
              [h.x + u, h.y, "L"],
              [h.x + u - o, h.y - s / 2, "L"],
              [h.x + u - o, h.y - r, "L"],
              [h.x + o, h.y - r, "L"],
              [h.x + o, h.y - s / 2, "L"],
              [h.x, h.y, "L"],
            ];
            return L.SVG.rotatedPath(f, h.x, h.y, m, !0);
          },
          pointsToArrowPath(n, i, A, d) {
            const h = n[0];
            if (!h) return "M0 0";
            const c = h[0],
              a = h[1],
              l = a.x - c.x,
              s = a.y - c.y,
              r = i * 4,
              o = i / 2,
              u = (r * Math.sqrt(3)) / 2;
            if (Math.abs(l) < u && Math.abs(s) < u) return "M0 0";
            const m = Math.sqrt(Math.pow(l, 2) + Math.pow(s, 2)),
              E = Math.atan2(s, l),
              f = [
                [c.x, c.y + o, "L"],
                [c.x + m - u, c.y + o, "L"],
                [c.x + m - u, c.y + r / 2, "L"],
                [c.x + m, c.y, "L"],
                [c.x + m - u, c.y - r / 2, "L"],
                [c.x + m - u, c.y - o, "L"],
                [c.x, c.y - o, "L"],
              ];
            return L.SVG.rotatedPath(f, c.x, c.y, E, !0);
          },
          pointsToCloudPath(n, i, A, d) {
            let h, c, a, l, s, r, o, u, m;
            const E = n[0];
            if (!E || E.length !== 4) return "M0 0";
            const f = d * 2,
              p = E[0],
              T = E[1],
              v = E[2],
              O = E[3],
              R = Math.round((v.x - T.x) / f) * f,
              C = Math.round((p.y - v.y) / f) * f;
            let y = `M ${T.x} ${T.y}`;
            const N = Math.max(R / f, 1),
              b = Math.max(C / f, 1);
            for (h = 0, a = N, c = 0 <= a; c ? h < a : h > a; c ? h++ : h--)
              y += `a${d},${d} 0 0,1 ${f},0`;
            for (h = 0, s = b, l = 0 <= s; l ? h < s : h > s; l ? h++ : h--)
              y += `a${d},${d} 0 0,1 0,${f}`;
            for (h = 0, o = N, r = 0 <= o; r ? h < o : h > o; r ? h++ : h--)
              y += `a${d},${d} 0 0,1 -${f},0`;
            for (h = 0, m = b, u = 0 <= m; u ? h < m : h > m; u ? h++ : h--)
              y += `a${d},${d} 0 0,1 0,-${f}`;
            return y;
          },
        });
  
      L.Fieldwire || (L.Fieldwire = {}),
        (L.Fieldwire.MeasurementLine = L.Polyline.extend({
          initialize(n, i) {
            return (
              L.Polyline.prototype.initialize.call(this, n, i),
              (this._originalWeight = i.weight),
              this.on("add", function () {
                if (
                  (this._updateMarker(),
                  this._marker && !this._map.hasLayer(this._marker))
                )
                  return this._map.addLayer(this._marker);
              }),
              this.on("remove", function () {
                if (this._marker && this._map.hasLayer(this._marker))
                  return this._map.removeLayer(this._marker);
              })
            );
          },
          clone() {
            const n = new L.Fieldwire.MeasurementLine(
              this.getLatLngs(),
              _.clone(this.options)
            );
            return (n._originalWeight = this._originalWeight), n;
          },
          _toXY(n) {
            let i, A;
            // if (this._map._custom.isTiled) {
            // const d = this._map.project([n.lat, n.lng], 1);
            // ({x: i} = d),
            // {y: A} = d
            // } else
            (i = n.lng), (A = 1000 - n.lat);
            console.log([Math.round(i * 1000), Math.round(A * 1000)]);
            return [Math.round(i * 1000), Math.round(A * 1000)];
          },
          _getMeters() {
            const n = this._toXY(this.getLatLngs()[0]),
              i = this._toXY(this.getLatLngs()[1]);
            return (
              Math.sqrt(Math.pow(i[0] - n[0], 2) + Math.pow(i[1] - n[1], 2)) *
              1000
            );
          },
          _getDescription() {
            const n = this._getMeters();
            // if (this._map._custom.measurementUnits === "imperial") {
            const i = (n / 0.3048) * 12;
            let A = Math.floor(i / 12);
            const d = i % 12;
            let h = Math.floor(d);
            if (i / 12 > 20)
              return h === 12 && ((A += 1), (h = 0)), `${A}' ${h}"`;
            {
              let c = Math.round((d % 1) / 0.0625),
                a = 16;
              c === 16
                ? ((c = null),
                  (a = null),
                  h === 11 ? ((h = 0), (A += 1)) : (h += 1))
                : c === 8
                ? ((a = 2), (c = 1))
                : c >= 4 && c % 4 == 0
                ? ((a = 4), (c = c / 4))
                : c >= 2 && c % 2 == 0 && ((a = 8), (c = c / 2));
              let l = `${A}' `;
              return (
                c && a
                  ? (h !== 0 && (l += `${h}-`), (l += `${c}/${a}`))
                  : (l += `${h}`),
                (l += '"'),
                l
              );
            }
            // } else
            //     return n > 2 ? `${n.toFixed(2)} m` : `${(n * 100).toFixed(1)} cm`
          },
          _divIcon(n, i) {
            console.log(n);
            console.log(i);
            // const A = this._getDescription()
            const A = "250 cm.",
              // , d = $.fn.textWidth(A, i);
              d = 48;
            n > Math.PI / 2 ? (n -= Math.PI) : n < -Math.PI / 2 && (n += Math.PI);
            const h = -(d / 2) + Math.sin(n) * i,
              c = -(i / 2) - Math.cos(n) * i;
            //   , d = $.fn.textWidth(A, i);
            // n > Math.PI / 2 ? n -= Math.PI : n < -Math.PI / 2 && (n += Math.PI);
            // const h = -(d / 2) + Math.sin(n) * i
            //   , c = -(i / 2) - Math.cos(n) * i;
            // return L.divIcon({
            //     className: "leaflet-measurement-line-marker",
            //     iconAnchor: [0, 0],
            //     iconSize: [d, i],
            //     html: `<div style="transform: translate(${h}px, ${c}px) rotate(${n}rad); font-size: ${i}px; color: ${this.options.color}" class="description">${A}</div>`
            // })
            return L.divIcon({
              className: "leaflet-measurement-line-marker",
              iconAnchor: [0, 0],
              iconSize: [d, i],
              html: `<div style="transform: translate(${h}px, ${c}px) rotate(${n}rad); font-size: ${i}px; color: ${this.options.color}; white-space: pre; line-height: 1; font-weight: 700;" >${A}</div>`,
            });
            // return L.divIcon({
            //     className: "leaflet-measurement-line-marker",
            //     iconAnchor: [0, 0],
            //     iconSize: [30, 30],
            //     html: `<div style="transform: translate(${90}px, ${90}px) rotate(${90}rad); font-size: ${24}px; color: ${'#ff0000'}" class="description">${A}</div>`
            // })
          },
          _updateMarker() {
            if (this.options.calibrate) return;
            const n = new L.LatLngBounds(this._latlngs),
              i = this._map.getZoom() - this._map.getMinZoom(),
              A = this._latlngs[0],
              d = this._latlngs[1],
              h = this._map.project(A, this._map.getZoom()),
              c = this._map.project(d, this._map.getZoom()),
              a = Math.atan2(h.y - c.y, h.x - c.x),
              l = Math.round((24 * Math.pow(2, i)) / 1000),
              // , l = Math.round(this.options.fontSize * Math.pow(2, i) / 1000)
              s = this._divIcon(a, l, this.options.description);
            return (
              this._marker
                ? (this._marker.setLatLng(n.getCenter()),
                  this._marker.setIcon(s),
                  this._marker.setOpacity(1))
                : (this._marker = L.marker(n.getCenter(), {
                    icon: s,
                    zIndexOffset: this.options.zIndexOffset,
                    opacity: 1,
                  })),
              (this._marker._description = this.options.description),
              (this._marker._fontSize = 24),
              (this._marker._layer = this)
            );
          },
          _updatePath() {
            console.log(this.options);
            const n = this._map.getZoom() - this._map.getMinZoom(),
              i = (this._originalWeight * Math.pow(2, n)) / 1000;
            return (
              this.options.weight !== i &&
                ((this.options.weight = i), this.setStyle(this.options)),
              this._marker && this._updateMarker(),
              this._renderer._updateMeasurementLine(this, i, 10, 10)
            );
            // this._renderer._updateMeasurementLine(this, i, this.options.arrowFactor, this.options.stemFactor)
          },
        }));
  
      // Measurement
      L.Measurement = L.Fieldwire.MeasurementLine.extend({
        clone() {
          const n = new L.Measurement(this.getLatLngs(), _.clone(this.options));
          return (n._originalWeight = this._originalWeight), (n._cloned = !0), n;
        },
        isCloned() {
          var n;
          return (n = this._cloned) !== null && n !== void 0 ? n : !1;
        },
        _getDescription() {
          return this.options.description || "";
        },
        _updatePath() {
          this._originalWeight || (this._originalWeight = this.options.weight);
          const n = this._originalWeight / 1000;
          this.options.weight !== n &&
            ((this.options.weight = n), this.setStyle(this.options)),
            this._marker && this._updateMarker(),
            this._renderer._updateMeasurement(this, this.options.weight);
        },
      });
  
      // MeasurementLine
      L.Draw.MeasurementLine = L.Draw.SimpleShape.extend({
        statics: {
          TYPE: "measurementline",
        },
        options: {
          cursorClass: "leaflet-measurement-cursor",
          shapeOptions: {
            stroke: !0,
            color: "#FF0000",
            weight: 4,
            opacity: 0.5,
            fill: !0,
            fillColor: null,
            fillOpacity: 0.2,
            clickable: !0,
            noClip: !0,
          },
        },
        initialize(n, i) {
          L.drawLocal.draw.handlers.measurementline = {
            tooltip: {
              start: "Click and drag to draw measurementline",
              endDrag: "endDrag to draw measurementline",
              endClick: "endClick to draw measurementline",
            },
          };
          return (
            (this.type = L.Draw.MeasurementLine.TYPE),
            (this.snap = !0),
            (this._initialLabelText =
              L.drawLocal.draw.handlers.measurementline.tooltip.start),
            (this._endDragLabelText =
              L.drawLocal.draw.handlers.measurementline.tooltip.endDrag),
            (this._endClickLabelText =
              L.drawLocal.draw.handlers.measurementline.tooltip.endClick),
            L.Draw.SimpleShape.prototype.initialize.call(this, n, i)
          );
        },
        _drawShape(n) {
          return this._shape
            ? this._shape.setLatLngs([this._startLatLng, n])
            : ((this._shape = new L.Fieldwire.MeasurementLine(
                [this._startLatLng, n],
                this.options.shapeOptions
              )),
              this._map.addLayer(this._shape));
        },
        _fireCreatedEvent() {
          if (this._shape._path.getAttribute("d") !== "M0 0") {
            const n = new L.Fieldwire.MeasurementLine(
              this._shape.getLatLngs(),
              this.options.shapeOptions
            );
            return L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, n);
          }
        },
      });
  
      // MeasurementLine - MeasurementCalibrate
      L.Draw.MeasurementCalibrate = L.Draw.MeasurementLine.extend({
        statics: {
          TYPE: "measurementcalibrate",
        },
        options: {
          cursorClass: "leaflet-measurement-cursor",
          shapeOptions: {
            stroke: !0,
            color: "#FF0000",
            weight: 4,
            opacity: 0.5,
            fill: !0,
            fillColor: null,
            fillOpacity: 0.2,
            clickable: !0,
            noClip: !0,
          },
        },
        initialize(n, i) {
          L.drawLocal.draw.handlers.measurementcalibrate = {
            tooltip: {
              start: "Click and drag to draw measurementcalibrate",
              endDrag: "endDrag to draw measurementcalibrate",
              endClick: "endClick to draw measurementcalibrate",
            },
          };
          return (
            (this.type = L.Draw.MeasurementCalibrate.TYPE),
            (this.snap = !0),
            (this._initialLabelText =
              L.drawLocal.draw.handlers.measurementcalibrate.tooltip.start),
            (this._endDragLabelText =
              L.drawLocal.draw.handlers.measurementcalibrate.tooltip.endDrag),
            (this._endClickLabelText =
              L.drawLocal.draw.handlers.measurementcalibrate.tooltip.endClick),
            L.Draw.SimpleShape.prototype.initialize.call(this, n, i)
          );
        },
      });
  
      // Arrow
      L.Draw.Arrow = L.Draw.SimpleShape.extend({
        statics: {
          TYPE: "arrow",
        },
        options: {
          cursorClass: "leaflet-arrow-cursor",
          shapeOptions: {
            stroke: !0,
            color: "#FF0000",
            weight: 4,
            opacity: 0.5,
            fill: !0,
            fillColor: null,
            fillOpacity: 0.2,
            clickable: !0,
            noClip: !0,
          },
        },
        initialize(n, i) {
          L.drawLocal.draw.handlers.arrow = {
            tooltip: {
              start: "Click and drag to draw Arrow",
              endDrag: "endDrag to draw Arrow",
              endClick: "endClick to draw Arrow",
            },
          };
          return (
            (this.type = L.Draw.Arrow.TYPE),
            (this.snap = !0),
            (this._initialLabelText =
              L.drawLocal.draw.handlers.arrow.tooltip.start),
            (this._endDragLabelText =
              L.drawLocal.draw.handlers.arrow.tooltip.endDrag),
            (this._endClickLabelText =
              L.drawLocal.draw.handlers.arrow.tooltip.endClick),
            L.Draw.SimpleShape.prototype.initialize.call(this, n, i)
          );
        },
        _drawShape(n) {
          this._shape
            ? this._shape.setLatLngs([this._startLatLng, n])
            : ((this._shape = new L.Arrow(
                [this._startLatLng, n],
                this.options.shapeOptions
              )),
              this._map.addLayer(this._shape));
        },
        _fireCreatedEvent() {
          if (this._shape._path.getAttribute("d") !== "M0 0") {
            const n = new L.Arrow(
              this._shape.getLatLngs(),
              this.options.shapeOptions
            );
            L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, n);
          }
        },
      });
  
      L.Map.mergeOptions({ arrow: true });
      L.Map.addInitHook("addHandler", "arrow", L.Map.arrow);
  
      // Highlight
      L.Draw.Highlight = L.Draw.SimpleShape.extend({
        statics: {
          TYPE: "drawing",
        },
        options: {
          cursorClass: "leaflet-pen-cursor",
          shapeOptions: {
            stroke: !0,
            color: "#00ffed",
            weight: 20,
            opacity: 0.5,
            fill: false,
            fillColor: null,
            fillOpacity: 0.2,
            clickable: !0,
            noClip: !0,
          },
        },
        initialize(n, i) {
          L.drawLocal.draw.handlers.drawing = {
            tooltip: {
              start: "Click and drag to draw drawing",
              endDrag: "endDrag to draw drawing",
              endClick: "endClick to draw drawing",
            },
          };
          return (
            (this.type = L.Draw.Drawing.TYPE),
            (this._latLngs = []),
            (this._initialLabelText =
              L.drawLocal.draw.handlers.drawing.tooltip.start),
            (this._endDragLabelText =
              L.drawLocal.draw.handlers.drawing.tooltip.endDrag),
            (this._endClickLabelText =
              L.drawLocal.draw.handlers.drawing.tooltip.endClick),
            L.Draw.SimpleShape.prototype.initialize.call(this, n, i)
          );
        },
        _mouseDownHandler(n) {
          if (!!this.canDraw(n))
            return (
              this._inBounds(n.latlng) &&
                !this._isDrawing &&
                ((this._isDrawing = !0),
                (this._startLatLng = n.latlng),
                (this._currentLatLng = n.latlng),
                (this._latLngs = [n.latlng])),
              L.DomEvent.on(
                document,
                "mouseup touchend",
                this._onMouseUp,
                this
              ).preventDefault(n.originalEvent)
            );
        },
        _fixBounds(n) {
          const { lat: i } = n,
            { lng: A } = n;
          return (
            i < 0 ? (n.lat = 0) : i > 1000 && (n.lat = 1000),
            A < 0 ? (n.lng = 0) : A > 1000 && (n.lng = 1000),
            n
          );
        },
        _onMouseMove(n) {
          if (
            (this._fixBounds(n.latlng),
            this._tooltip.updatePosition(n.latlng),
            this._isDrawing)
          )
            return (
              (this._currentLatLng = n.latlng),
              this._latLngs.push(n.latlng),
              this._tooltip.updateContent({
                text: this._isClick
                  ? this._endClickLabelText
                  : this._endDragLabelText,
              }),
              this._drawShape()
            );
        },
        _drawShape() {
          console.log(this._latLngs);
  
          return this._shape
            ? this._shape.setLatLngs(this._latLngs)
            : ((this._shape = new L.Drawing(
                this._latLngs,
                this.options.shapeOptions
              )),
              this._map.addLayer(this._shape));
        },
        _fireCreatedEvent() {
          return L.Draw.SimpleShape.prototype._fireCreatedEvent.call(
            this,
            new L.Drawing(this._latLngs, this.options.shapeOptions)
          );
        },
      });
  
      L.Map.mergeOptions({ highlight: true });
      L.Map.addInitHook("addHandler", "highlight", L.Map.highlight);
  
      // Drawing
      L.Draw.Drawing = L.Draw.SimpleShape.extend({
        statics: {
          TYPE: "drawing",
        },
        options: {
          cursorClass: "leaflet-pen-cursor",
          shapeOptions: {
            stroke: !0,
            color: "#b400ff",
            weight: 4,
            opacity: 1,
            fill: false,
            fillColor: null,
            fillOpacity: 0.2,
            clickable: !0,
            noClip: !0,
          },
        },
        initialize(n, i) {
          L.drawLocal.draw.handlers.drawing = {
            tooltip: {
              start: "Click and drag to draw drawing",
              endDrag: "endDrag to draw drawing",
              endClick: "endClick to draw drawing",
            },
          };
          return (
            (this.type = L.Draw.Drawing.TYPE),
            (this._latLngs = []),
            (this._initialLabelText =
              L.drawLocal.draw.handlers.drawing.tooltip.start),
            (this._endDragLabelText =
              L.drawLocal.draw.handlers.drawing.tooltip.endDrag),
            (this._endClickLabelText =
              L.drawLocal.draw.handlers.drawing.tooltip.endClick),
            L.Draw.SimpleShape.prototype.initialize.call(this, n, i)
          );
        },
        _mouseDownHandler(n) {
          if (!!this.canDraw(n))
            return (
              this._inBounds(n.latlng) &&
                !this._isDrawing &&
                ((this._isDrawing = !0),
                (this._startLatLng = n.latlng),
                (this._currentLatLng = n.latlng),
                (this._latLngs = [n.latlng])),
              L.DomEvent.on(
                document,
                "mouseup touchend",
                this._onMouseUp,
                this
              ).preventDefault(n.originalEvent)
            );
        },
        _fixBounds(n) {
          const { lat: i } = n,
            { lng: A } = n;
          return (
            i < 0 ? (n.lat = 0) : i > 1000 && (n.lat = 1000),
            A < 0 ? (n.lng = 0) : A > 1000 && (n.lng = 1000),
            n
          );
        },
        _onMouseMove(n) {
          if (
            (this._fixBounds(n.latlng),
            this._tooltip.updatePosition(n.latlng),
            this._isDrawing)
          )
            return (
              (this._currentLatLng = n.latlng),
              this._latLngs.push(n.latlng),
              this._tooltip.updateContent({
                text: this._isClick
                  ? this._endClickLabelText
                  : this._endDragLabelText,
              }),
              this._drawShape()
            );
        },
        _drawShape() {
          console.log(this._latLngs);
  
          return this._shape
            ? this._shape.setLatLngs(this._latLngs)
            : ((this._shape = new L.Drawing(
                this._latLngs,
                this.options.shapeOptions
              )),
              this._map.addLayer(this._shape));
        },
        _fireCreatedEvent() {
          return L.Draw.SimpleShape.prototype._fireCreatedEvent.call(
            this,
            new L.Drawing(this._latLngs, this.options.shapeOptions)
          );
        },
      });
  
      L.Map.mergeOptions({ drawing: true });
      L.Map.addInitHook("addHandler", "drawing", L.Map.drawing);
  
      // Cloud
      L.Draw.Cloud = L.Draw.SimpleShape.extend({
        statics: {
          TYPE: "cloud",
        },
        options: {
          cursorClass: "leaflet-cloud-cursor",
          shapeOptions: {
            attribution: null,
            bubblingMouseEvents: true,
            color: "#FF0000",
            dashArray: null,
            dashOffset: null,
            fill: true,
            fillColor: null,
            fillOpacity: 0.2,
            fillRule: "evenodd",
            interactive: true,
            lineCap: "round",
            lineJoin: "round",
            noClip: false,
            opacity: 1,
            pane: "overlayPane",
            smoothFactor: 1,
            stroke: true,
            weight: 3.072,
          },
        },
        initialize(n, i) {
          L.drawLocal.draw.handlers.cloud = {
            tooltip: {
              start: "Click and drag to draw Cloud",
              endDrag: "endDrag to draw Cloud",
              endClick: "endClick to draw Cloud",
            },
          };
          return (
            (this.type = L.Draw.Cloud.TYPE),
            (this._initialLabelText =
              L.drawLocal.draw.handlers.cloud.tooltip.start),
            (this._endDragLabelText =
              L.drawLocal.draw.handlers.cloud.tooltip.endDrag),
            (this._endClickLabelText =
              L.drawLocal.draw.handlers.cloud.tooltip.endClick),
            L.Draw.SimpleShape.prototype.initialize.call(this, n, i)
          );
        },
        _drawShape(n) {
          let i = new L.LatLngBounds(this._startLatLng, n);
          if (this._shiftMode) {
            const A = i.getNorthWest(),
              d = i.getNorthEast(),
              h = i.getSouthWest(),
              c = i.getSouthEast(),
              a = c.lng - A.lng,
              l = A.lat - c.lat,
              s = Math.min(a, l);
            A.equals(this._startLatLng)
              ? (i = new L.LatLngBounds(A, new L.LatLng(A.lat - s, A.lng + s)))
              : d.equals(this._startLatLng)
              ? (i = new L.LatLngBounds(d, new L.LatLng(d.lat - s, d.lng - s)))
              : h.equals(this._startLatLng)
              ? (i = new L.LatLngBounds(h, new L.LatLng(h.lat + s, h.lng + s)))
              : (i = new L.LatLngBounds(c, new L.LatLng(c.lat + s, c.lng - s)));
          }
          return this._shape
            ? this._shape.setBounds(i)
            : ((this._shape = new L.Cloud(i, this.options.shapeOptions)),
              this._map.addLayer(this._shape));
        },
        _fireCreatedEvent() {
          const n = new L.Cloud(
            this._shape.getBounds(),
            this.options.shapeOptions
          );
          return L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, n);
        },
      });
  
      L.Map.mergeOptions({ cloud: true });
      L.Map.addInitHook("addHandler", "cloud", L.Map.cloud);